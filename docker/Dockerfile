# Çok aşamalı build: Bağımlılık kurulumu
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production --no-audit --silent

# Build aşaması: Derleme
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Derleme işlemini hızlandırmak için
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Üretim aşaması: Minimal imaj
FROM nginx:alpine AS runtime
# Nginx'i hızlandırmak için
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
# Gereksiz dosyaları temizle
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*
EXPOSE 80
# Nginx'i hafif modda başlat
CMD ["nginx", "-g", "daemon off;"]
