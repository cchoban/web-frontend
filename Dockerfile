FROM node:10.13-alpine
WORKDIR /usr/src/app
ADD . .
RUN npm install --silent
EXPOSE 3000
RUN npm run build
CMD npm start
VOLUME [ "/usr/src/app" ]
