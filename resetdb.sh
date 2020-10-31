#!/bin/bash

while true; do
  read -p "Do you wish to reset database?" yn
  case $yn in
    [Yy]*) break;;
    [Nn]*) exit;;
    *) echo "Please answer yes or no.";;
  esac
done
rm -f ./back/uploads/*
mongo inno-comp ./back/resetdb.js
