FROM node:22

WORKDIR /usr/src/app
COPY . .

# build application
RUN cd server ; npm ci ; cd ..
RUN cd page ; npm ci ; cd ..
RUN npm run build

WORKDIR /usr/src/app/server
CMD [ "node", "--max-old-space-size=8192" ,".built/index.js" ]
