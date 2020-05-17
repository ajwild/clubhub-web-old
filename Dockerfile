FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

# See .dockerignore
COPY . .

RUN npm run build

CMD npm start -- -p 8080
