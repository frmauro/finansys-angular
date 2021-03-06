FROM node:alpine AS builder

WORKDIR /app

COPY . .

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/