#!/bin/bash

rm -F ./back/uploads/*
mongo inno-comp ./back/resetdb.js
