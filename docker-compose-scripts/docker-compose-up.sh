#!/usr/bin/bash

#docker-compose build

export MY_UID="$(id -u)"
export MY_GID="$(id -g)"
export TZ=${TZ}
export DISPLAY=$DISPLAY 
export XMODIFIERS=$XMODIFIERS 
export QT_IM_MODULE=$QT_IM_MODULE 
export GTK_IM_MODULE=$GTK_IM_MODULE 
export LANG=$LANG

#docker-compose up
#docker-compose run app bash
#docker-compose run app 

#export GRID_SETTINGS=/settings/2-1x,3v.demo.js
export GRID_SETTINGS=/settings/3-1w,3r,av.demo.js
docker-compose run app electron main.js --no-sandbox

