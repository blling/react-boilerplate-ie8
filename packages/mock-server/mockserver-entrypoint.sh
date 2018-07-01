#!/bin/sh

npm config set registry http://nexus3.cqrd.x/repository/npm-public/
cd ~/mockserver
yarn install
yarn start
