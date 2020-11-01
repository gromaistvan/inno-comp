#!/bin/bash

if [[ $UID != 0 ]]; then
  echo "Please run this script with sudo!"
  echo "sudo -E $0 $*"
  exit 1
fi

while true; do
  read -p "Do you wish to reset database (yes/no)? " yn
  case $yn in
    [Yy]*) break;;
    [Nn]*) exit;;
    *) echo "Please answer yes or no.";;
  esac
done

TIME=$(date +%Y%m%d%H%M%S)
mkdir ./restore/$TIME
mv -f ./back/uploads/* ./restore/$TIME/
mongoexport --db=inno-comp --collection=applicants --out=./restore/$TIME/db.json
mongo inno-comp ./back/resetdb.js
