#!/usr/bin/bash
set -e

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh  # This loads NVM
cd ~/tecky-exercises-solutions-tw/BAD011/web-server
git pull
npm install
npm run update-db
npm run start:prod