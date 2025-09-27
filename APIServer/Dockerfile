FROM node:alpine

WORKDIR /apiserver

COPY ./package*.json .
COPY ./.env.template .
COPY ./db.js .
COPY ./password.js .
COPY ./server.js .

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]