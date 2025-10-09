FROM node:18-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY client/package.json .
COPY client/yarn.lock .
RUN yarn install --production --network-timeout 240000

COPY client .

RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
