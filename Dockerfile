FROM node:12.4.0 as node

WORKDIR /var/www

ENV NODE_ENV=prod
ENV NODE_PATH=/usr/local/lib/node_modules

COPY package.json package.json

RUN npm i && \
    npm i -g webpack

COPY . .


CMD ["npm", "run", "start"]