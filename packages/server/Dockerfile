FROM node:12 as builder

COPY ./ /app

WORKDIR /app
RUN npm install
RUN npm run build

FROM node:12-alpine as server

COPY --from=builder /app/dist /app
COPY ./package.json /app

WORKDIR /app
ENV NODE_ENV=production
RUN npm install

EXPOSE 3000

CMD [ "node", "app.js" ]