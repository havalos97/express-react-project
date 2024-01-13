FROM node:18-alpine

WORKDIR /usr/src/app/backend
COPY .en[v] ./
COPY ./package*.json ./
RUN yarn

COPY . .

EXPOSE 3001
CMD ["yarn", "start"]
