#!/bin/sh
java -jar ../tools/closure-compiler.jar --js_output_file=../release/spinus-audio.js ../src/core/*.js ../src/audio/*.js