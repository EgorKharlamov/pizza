FROM node:alpine

WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 2310
CMD [ "yarn", "run", "start:prod" ]
