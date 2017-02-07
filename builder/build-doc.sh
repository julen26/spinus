#!/bin/sh
rm -rf ../doc/api
java -jar ../tools/jsdoc-toolkit/jsrun.jar ../tools/jsdoc-toolkit/app/run.js ../src/* -t=../tools/jsdoc-toolkit/templates/bluelabel-jsdoc -d=../doc/api