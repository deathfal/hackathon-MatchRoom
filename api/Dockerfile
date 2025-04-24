FROM node:16

WORKDIR /app

COPY package*.json ./
COPY server.js ./ 
COPY dataset.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
