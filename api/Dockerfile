FROM node:12.16.3

RUN mkdir /var/opt/build

WORKDIR /var/opt/build

COPY . .

# RUN apk update && \
#   apk upgrade && \
#   apk add bash git

# RUN find / -perm +6000 -type f -not -path '/proc/*' -exec chmod a-s {} \; || true

RUN mkdir -p test/images/
RUN npm install
RUN npm run build

ENV NODE_ENV=production



EXPOSE 5001 9228
CMD [ "npm", "run", "start" ]
