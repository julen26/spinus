rmdir /s /q ..\docs\api
java -jar ..\tools\jsdoc-toolkit\jsrun.jar ..\tools\jsdoc-toolkit\app\run.js ..\src\* -t=..\tools\jsdoc-toolkit\templates\bluelabel-jsdoc -d=..\docs\api
copy /y ..\release\spinus.js ..\docs\tryit\spinus\
pause