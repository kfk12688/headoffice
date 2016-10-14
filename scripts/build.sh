#!/usr/bin/env bash

node_modules/rimraf/bin.js dist
cross-env NODE_ENV=production webpack --config ./webpack.production.config.js --progress --profile --colors
cp src/server.production.js dist/server.js
