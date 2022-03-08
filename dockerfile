FROM node:12-slim

WORKDIR /usr/src/app
COPY . .

RUN cd server && npm install

CMD [ "node", "server/dist/main.js" ]