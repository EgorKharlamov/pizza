FROM node:14.21-alpine

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 2310
CMD [ "npm", "run", "start:prod" ]
