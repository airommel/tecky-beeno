#!/usr/bin/bash
npx forever list | grep index.js
if [ $? == 0 ]; then
  npx forever restart index.js
else
  npx forever start index.js
fi
exit $?