FROM node:14.8.0

RUN mkdir app

COPY package.json package-lock.json app/
COPY src app/src
COPY bin app/bin

WORKDIR /app

RUN npm link
