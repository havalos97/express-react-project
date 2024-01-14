FROM node:18-alpine

WORKDIR /usr/src/app/frontend
COPY .en[v] ./
COPY ./package*.json ./
RUN yarn

COPY . .

RUN chown -R node:node .
USER node

EXPOSE 3000
CMD ["yarn", "start"]
