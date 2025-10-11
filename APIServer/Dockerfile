FROM node:alpine

WORKDIR /apiserver

COPY ./package*.json .
COPY ./config/* ./config/
COPY ./services/db.js ./services/
COPY ./services/auth.js ./services/
COPY ./services/dbTool.js ./services/
COPY ./server.js .
COPY ./controller/* ./controller/

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]