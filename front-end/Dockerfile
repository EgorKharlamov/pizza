FROM node:latest as builder

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y libpq-dev postgresql-client

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN mkdir -p /app/node_modules/node-sass/vendor/linux-x64-51
RUN curl -L https://github.com/sass/node-sass/releases/download/v4.5.0/linux-x64-51_binding.node -o ./node_modules/node-sass/vendor/linux-x64-51/binding.node

RUN npm ci --silent
RUN npm i react-scripts@4.0.1 -g --silent
COPY . ./
RUN npm run sass:rebuild
RUN npm run build


#nginx
FROM nginx:1.16.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]