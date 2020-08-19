FROM node:14.8.0

RUN mkdir app

COPY package.json package-lock.json app/
COPY src app/src
COPY bin app/bin
COPY tests app/tests

WORKDIR /app

RUN npm i && npm link

EXPOSE 2020

CMD node ./src/server.js
