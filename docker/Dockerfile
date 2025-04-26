# 1. Build aşaması
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --silent
COPY . .
RUN npm run build

# 2. Production aşaması
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# SPA için rewrite ve cache ayarlı nginx config
RUN echo 'server { \
    listen 80; \
    server_name _; \
    root /usr/share/nginx/html; \
    location / { \
        try_files $uri $uri/ /index.html; \
        index index.html; \
        expires 1d; \
        add_header Cache-Control "public, max-age=86400"; \
    } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 30d; \
        add_header Cache-Control "public, max-age=2592000"; \
    } \
    error_page 500 502 503 504 /50x.html; \
    location = /50x.html { root /usr/share/nginx/html; } \
}' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]