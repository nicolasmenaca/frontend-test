# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .

ARG VITE_AUTH_API_URL
ARG VITE_USER_API_URL
ARG VITE_POST_API_URL

ENV VITE_AUTH_API_URL=$VITE_AUTH_API_URL
ENV VITE_USER_API_URL=$VITE_USER_API_URL
ENV VITE_POST_API_URL=$VITE_POST_API_URL

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
