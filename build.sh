#!/bin/sh

printf "Minification... "
uglifyjs src/* --compress --mangle -o build/sheetsu-web-client.js
echo "DONE"
