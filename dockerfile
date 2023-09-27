FROM node:18-slim

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN cd server && npm install && cd ..
RUN cd client && npm install && cd ..
RUN npm run build

CMD [ "node", "server/dist/main.js" ]