FROM node:12-alpine3.15

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production
RUN npm cache clean --force

COPY . .

EXPOSE 8005

CMD [ "npm", "run", "prod" ]
