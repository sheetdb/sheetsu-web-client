#!/bin/sh

printf "Uploading script to script.sheetsu.com... "
scp build/sheetsu-web-client.js deployer@script.sheetsu.com:/home/deployer/script.sheetsu.com/sheetsu-web-client.js
echo "DONE"
