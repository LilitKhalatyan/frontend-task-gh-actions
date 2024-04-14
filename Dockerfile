FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "run", "start"]