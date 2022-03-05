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

docker-compose run app electron main.js


