#! /bin/bash

PROJECT_NAME="viseo-bbl-nlu"
PM2CONF_FILE="pm2.ecosystem.config.js"

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

if [ ! -d "node_modules" ]; then
  npm install
fi

pm2 list | grep -w $PROJECT_NAME

if [[ $? -eq 0 ]]; then
  pm2 delete $PROJECT_NAME
fi

MODE="LOCAL"
pm2 start $PM2CONF_FILE

printf "\n"
echo -e "${GREEN}Starting the application in $MODE mode ${NC}"
