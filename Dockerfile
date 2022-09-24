FROM node:12-alpine
COPY . .
WORKDIR /usr/src/app
RUN npm install
CMD npm start