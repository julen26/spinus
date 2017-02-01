rmdir /s /q ..\doc
java -jar ..\tools\jsdoc-toolkit\jsrun.jar ..\tools\jsdoc-toolkit\app\run.js ..\src\* -t=..\tools\jsdoc-toolkit\templates\jsdoc -d=..\doc
pause