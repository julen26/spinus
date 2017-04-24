#!/bin/sh
rm -rf ../docs/api
java -jar ../tools/jsdoc-toolkit/jsrun.jar ../tools/jsdoc-toolkit/app/run.js ../src/* -t=../tools/jsdoc-toolkit/templates/bluelabel-jsdoc -d=../docs/api
cp ../release/spinus.js ../docs/tryit/spinus/
