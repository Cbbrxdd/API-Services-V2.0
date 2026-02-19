@echo off
set "dosyaAdi=node_modules"
title API Services - Made By CbbrDigital
:a
if exist "%dosyaAdi%" (
    color b
    node --no-deprecation --trace-deprecation --no-warnings --trace-warnings --max-old-space-size=2048 index.js
) else (
    echo Node Modules Bulunamadi! Yukleniyor...
    npm i
    cls
    color b
    node --no-deprecation --trace-deprecation --no-warnings --trace-warnings --max-old-space-size=2048 index.js
)
goto a