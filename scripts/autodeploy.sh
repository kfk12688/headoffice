#!/usr/bin/env bash

cd ~/ho_app/headoffice
git fetch origin
git reset --hard origin/master
npm run build
