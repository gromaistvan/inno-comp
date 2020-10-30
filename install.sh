#!/bin/bash

is_sudo () {
  if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
  fi
}

download () {
  echo "Downloading source"
  git stash
  git pull
  git stash drop
}

mongo() {
  [ -f /usr/bin/mongo ] && return
  echo "Intalling MongoDB"
  if [ ! -f /etc/apt/sources.list.d/mongodb-org-4.4.list ]; then
    [ -f /usr/share/doc/gnupg ] || apt-get install -y gnupg
    [ -f /usr/bin/wget ] || apt-get install -y wget
    wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
    case $(cat /etc/os-release | awk -F '=' '/^VERSION_ID/{print $2}' | awk '{print $1}' | tr -d '"') in
      "20.04")
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
        ;;
      "18.04")
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
        ;;
      "16.04")
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
        ;;
    esac
    apt-get update
  fi
  apt-get install -y mongodb-org
  systemctl enable mongod
  systemctl start mongod
}

node() {
  echo "Intalling Node.js"
  if [ ! -f /usr/bin/node ]; then
    if [ ! -f nodesource_setup.sh ]; then
      apt-get install -y curl
      curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
      chmod +x nodesource_setup.sh
      ./nodesource_setup.sh
    fi
    apt-get install -y nodejs
  fi
  which gcc
  if [ $? == 1 ]; then
    apt-get install -y build-essential
  fi
  npm install -g npm@latest webpack@latest webpack-cli@latest
  pushd back
  npm install
  npm run build
  popd
  pushd front
  npm install
  npm run build
  popd
}

application() {
  echo "Intalling inno-comp"
  systemctl stop inno-comp.service
  systemctl disable inno-comp.service
  sed -i "s/\$DIRECTORY/$(pwd | sed 's/\//\\\//g')/g" inno-comp.service
  systemctl enable $PWD/inno-comp.service
  systemctl start inno-comp.service
  systemctl status inno-comp.service --no-pager -l
}

is_sudo
download
mongo
node
application
