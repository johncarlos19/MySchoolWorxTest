FROM node:16.13.2-alpine as build-step
WORKDIR /app
COPY package.json ./
RUN npm install --save --legacy-peer-deps
COPY . .
EXPOSE 4200
CMD npm run start
