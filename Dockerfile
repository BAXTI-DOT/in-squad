FROM node:18-alpine
COPY . .
WORKDIR /usr/src/app
RUN npm install
CMD npm start