#!/bin/bash

function init {
  if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo!"
    echo "sudo $0 $*"
    exit 1
  fi
  [[ -f /usr/bin/figlet ]] || apt-get install -y figlet
}

function download {
  CHANGED=0
  git pull --dry-run 2>&1 | grep -q -v 'Already up-to-date.' && CHANGED=1
  if [[ $CHANGED == 1 ]]; then
    figlet "Downloading"
    git stash
    git pull
    git stash drop
    ./$(basename $0) && exit
  fi
}

function mongo {
  if [[ ! -f /usr/bin/mongo ]]; then
    figlet "MongoDB"
    if [[ ! -f /etc/apt/sources.list.d/mongodb-org-4.4.list ]]; then
      [[ -f /usr/share/doc/gnupg ]] || apt-get install -y gnupg
      [[ -f /usr/bin/wget ]] || apt-get install -y wget
      wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
      . /etc/os-release
      echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $VERSION_CODENAME/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
      apt-get update
    fi
    apt-get install -y mongodb-org
    systemctl enable mongod
    systemctl start mongod
  fi
}

function node {
  figlet "Node.js"
  if [[ ! -f /usr/bin/node ]]; then
    if [[ ! -f nodesource_setup.sh ]]; then
      apt-get install -y curl
      curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
      chmod +x nodesource_setup.sh
      ./nodesource_setup.sh
    fi
    apt-get install -y nodejs
  fi
  [[ -f /usr/bin/gcc ]] || apt-get install -y build-essential
  npm install npm@latest webpack@latest webpack-cli@latest -g --loglevel=error
}

function nginx {
  figlet "nginx"
  [[ -f /usr/sbin/nginx ]] || apt-get install -y nginx
  [[ ! -z "$PUBHOST" ]] || read -p "Host: " PUBHOST
  if [[ ! -f /etc/nginx/sites-available/$PUBHOST ]]; then
    [[ ! -z "$PORT" ]] || read -p "Back-end port: " PORT
    pushd /etc/nginx/sites-available/
    cat >$PUBHOST <<EOT
server {
        listen 80;
        server_name ${PUBHOST:-localhost};
        client_max_body_size 100M;

        location /  {
                proxy_pass http://localhost:${PORT:-8080};
                proxy_http_version 1.1;
                proxy_set_header Upgrade \$http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host \$host;
                proxy_cache_bypass \$http_upgrade;
        }
}
EOT
    popd
    pushd /etc/nginx/sites-enabled/
    ln -s ../sites-available/$PUBHOST
    popd
    systemctl reload nginx.service
  fi
}

function application {
  figlet "inno-comp"
  pushd back
  npm install --loglevel=error
  npm run build
  popd
  pushd front
  npm install --loglevel=error
  npm run build
  popd
  if [[ ! -f ./inno-comp.service ]]; then
    [[ ! -z "$PORT" ]] || read -p "Back-end port: " PORT
    [[ ! -z "$GMAIL_ADDRESS" ]] || read -p "Email: " GMAIL_ADDRESS
    [[ ! -z "$GMAIL_PASSWORD" ]] || read -p "Password: " GMAIL_PASSWORD
    cat >inno-comp.service <<EOT
[Unit]
Description=Innovációs ösztöndíj 2020
After=network.target mongod.service
Requires=mongod.service
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
Environment=NODE_ENV=production PORT=${PORT:-8080} GMAIL_ADDRESS=${GMAIL_ADDRESS} GMAIL_PASSWORD=${GMAIL_PASSWORD}

[Install]
WantedBy=multi-user.target
EOT
    systemctl enable $PWD/inno-comp.service
    systemctl start inno-comp.service
  else
    systemctl restart inno-comp.service
  fi
  systemctl status inno-comp.service --no-pager -l
}

init
download
mongo
node
nginx
application
