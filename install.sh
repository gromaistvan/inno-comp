#!/bin/bash

function init {
  if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo!"
    echo "sudo -E $0 $*"
    exit 1
  fi
  [[ -f /usr/bin/figlet ]] || apt-get install -y figlet
}

function download {
  CHANGED=0
  git pull --dry-run 2>&1 | grep -q -v 'Already up-to-date.' && CHANGED=1
  if [[ $CHANGED == 1 ]]; then
    figlet "downloading"
    git stash
    git pull
    git stash drop
    ./$(basename $0) $*
    exit
  fi
}

function nginx {
  if [[ ! -f /etc/nginx/sites-available/inno-comp ]]; then
    figlet "nginx"
    [[ -f /usr/sbin/nginx ]] || apt-get install -y nginx
    [[ ! -z "$PUBLIC_HOST" ]] || read -e -p "Hostname: " -i $(hostname -f) PUBLIC_HOST
    [[ ! -z "$LOCAL_PORT" ]] || read -e -p "Back-end port: " -i 8080 LOCAL_PORT
    pushd /etc/nginx/sites-available/
    cat >inno-comp <<eot
server {
        listen 80;
        server_name ${PUBLIC_HOST:-localhost};
        client_max_body_size 100M;

        location /  {
                proxy_pass http://localhost:${LOCAL_PORT:-8080};
                proxy_http_version 1.1;
                proxy_set_header Upgrade \$http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host \$host;
                proxy_cache_bypass \$http_upgrade;
        }
}
eot
    popd
    pushd /etc/nginx/sites-enabled/
    ln -s ../sites-available/inno-comp
    popd
    systemctl restart nginx
  fi
}

function node {
  figlet "node.js"
  if [[ ! -f /usr/bin/node ]]; then
    if [[ ! -f node.sh ]]; then
      [[ -f /usr/bin/curl ]] || apt-get install -y curl
      curl -fsSL https://deb.nodesource.com/setup_16.x -o node.sh
      chmod +x node.sh
      ./node.sh
    fi
    apt-get install -y nodejs
  fi
  [[ -f /usr/bin/gcc ]] || apt-get install -y build-essential
  npm install npm@latest webpack@latest webpack-cli@latest -g --loglevel=error
}

function mongo {
  if [[ ! -f /usr/bin/mongo ]]; then
    figlet "mongo"
    if [[ ! -f /etc/apt/sources.list.d/mongodb-org-5.0.list ]]; then
      [[ -f /usr/bin/gpg ]] || apt-get install -y gnupg
      [[ -f /usr/bin/wget ]] || apt-get install -y wget
      . /etc/os-release
      wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
      echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $VERSION_CODENAME/mongodb-org/5.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
      apt-get update
    fi
    apt-get install -y mongodb-org
    systemctl enable mongod
    systemctl start mongod
  fi
}

function application {
  pushd back
  figlet "back-end"
  npm install --loglevel=error
  npm run build
  figlet "database"
  MONGO="`mongo --eval "'|' + db.getMongo().getDBNames().join('|') + '|'"`"
  echo "MONGO: $MONGO"
  if [[ "$MONGO" == *"|inno-comp|"* ]]; then
    echo "Found inno-comp database."
  else
    npm run database
  fi
  popd
  pushd front
  figlet "front-end"
  npm install --loglevel=error
  npm run build
  popd
  figlet "service"
  if [[ ! -f ./inno-comp.service ]]; then
    [[ ! -z "$LOCAL_PORT" ]] || read -e -p "Back-end port: " -i 8080 LOCAL_PORT
    [[ ! -z "$SMTP_USER" ]] || read -e -p "Email user: " -i "@" SMTP_USER
    [[ ! -z "$SMTP_PASSWORD" ]] || read -e -p "Email password: " -s SMTP_PASSWORD
    echo
    cat >inno-comp.service <<eot
[Unit]
Description=Innovációs ösztöndíj
After=network.target mongod.service nginx.service
Requires=mongod.service nginx.service
AssertPathExists=${PWD}/back

[Service]
Type=simple
ExecStart=/usr/bin/npm start
WorkingDirectory=${PWD}/back
Restart=always
RestartSec=60
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=inno-comp
Environment=NODE_ENV=production PORT=${LOCAL_PORT:-8080} SMTP_USER=${SMTP_USER} SMTP_PASSWORD=${SMTP_PASSWORD}

[Install]
WantedBy=multi-user.target
eot
    systemctl enable $PWD/inno-comp.service
    systemctl start inno-comp.service
  else
    systemctl restart inno-comp.service
  fi
  systemctl status inno-comp.service --no-pager -l
}

init
download
nginx
node
mongo
application
