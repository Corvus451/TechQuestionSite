FROM node:alpine

WORKDIR /authserver

COPY ./package*.json .
COPY ./config .
COPY ./utilities .
COPY ./services .
COPY ./index.js .
COPY ./controller .

RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]
