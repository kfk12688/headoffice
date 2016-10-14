#!/usr/bin/env bash

cd ~/ho_app/headoffice

node_modules/rimraf/bin.js dist
mkdir dist

node_modules/cross-env/bin/cross-env.js NODE_ENV=production node_modules/webpack/bin/webpack.js --config ./webpack.production.config.js --progress --profile --colors
cp src/server.production.js dist/server.js
