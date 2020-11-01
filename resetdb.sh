#!/bin/bash

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
mv -b ./back/uploads/* ./restore/$TIME/
mongoexport --db=inno-comp --out=./restore/$TIME/db.json
mongo inno-comp ./back/resetdb.js
