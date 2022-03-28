FROM ubuntu:20.04

# ----------------------
# Necessary for most operations

RUN useradd -m user
RUN apt-get update

# ----------------------
# Necessary for Chinese typing

RUN DEBIAN_FRONTEND=noninteractive \
      apt-get install -y \
      fonts-noto-cjk language-pack-zh-hans
RUN locale-gen zh_TW.UTF-8  
ENV LC_ALL=zh_TW.UTF-8

# ----------------------
# Setup application

RUN DEBIAN_FRONTEND=noninteractive \
      apt-get install -y \
      curl 
RUN cd /tmp
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt install nodejs -y

# -----------------------
# Prepare node.js packages

RUN npm install -g npm@8.5.3 electron

# https://stackoverflow.com/a/65107381/6645399
RUN apt install libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev -y

# https://medium.com/@ssmak/how-to-fix-puppetteer-error-while-loading-shared-libraries-libx11-xcb-so-1-c1918b75acc3
RUN apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget -y

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN npm i