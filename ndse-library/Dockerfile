FROM node:alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install

EXPOSE 3000

CMD [ "node", "index.js"]