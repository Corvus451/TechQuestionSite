FROM node:alpine

WORKDIR /authserver

COPY ./package*.json .
COPY ./config/* ./config/
COPY ./utilities/* ./utilities/
COPY ./services/* ./services/
COPY ./index.js .
COPY ./controller/* ./controller/

RUN npm install

EXPOSE 3001

CMD ["node", "index.js"]
