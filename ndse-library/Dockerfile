FROM node:alpine

WORKDIR /app

COPY app/package*.json ./

RUN npm install && npm install typescript -g

COPY app .

RUN tsc

EXPOSE 3000

CMD [ "npm", "run", "start"]
