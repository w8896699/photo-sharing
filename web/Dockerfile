FROM node:14.11-alpine as builder

ARG NODE_MAJOR_VERSION=12
ARG NODE_VERSION=14.11.x

RUN mkdir /opt/app

WORKDIR /opt/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build


FROM caddy:2.4.5-alpine
# Default dir for caddy image

RUN mkdir /opt/app-root
RUN mkdir /opt/app-root/etc

WORKDIR /opt/app-root/www

# RUN ls /opt/app
COPY --from=builder /opt/app/build .
COPY Caddyfile /opt/app-root/etc 

RUN caddy fmt /opt/app-root/etc/Caddyfile --overwrite

RUN chmod -R 775 /opt/app-root/*
WORKDIR /opt/app-root/www


EXPOSE 2015

CMD ["/usr/bin/caddy", "run", "--config", "/opt/app-root/etc/Caddyfile"]



