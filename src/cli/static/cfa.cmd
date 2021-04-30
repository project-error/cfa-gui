@echo off
setlocal
set VSCODE_DEV=
set ELECTRON_RUN_AS_NODE=1
echo %~dp0
echo %*
"%~dp0..\cfa.exe" "%~dp0cli.js" %*
endlocal