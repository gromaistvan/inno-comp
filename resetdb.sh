#!/bin/bash

rm -f ./back/uploads/*
mongo inno-comp ./back/resetdb.js
