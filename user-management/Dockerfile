FROM node:13.10.1-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]
