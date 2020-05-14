FROM node:12-alpine

WORKDIR /usr/src/app

# See .dockerignore
COPY . .

RUN npm install --only=production

RUN npm run build

CMD npm start -- -p 8080
