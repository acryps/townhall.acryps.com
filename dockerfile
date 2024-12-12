FROM node:18-slim

WORKDIR /usr/src/app
COPY . .

# build application
RUN cd server ; npm ci ; cd ..
RUN cd page ; npm ci ; cd ..
RUN npm run build

WORKDIR /usr/src/app/server
CMD [ "node", ".built/index.js" ]
