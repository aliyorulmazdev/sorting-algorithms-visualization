# Çok aşamalı build: Bağımlılık kurulumu
FROM node:18-alpine AS deps
WORKDIR /app
# Önce sadece package.json ve package-lock.json kopyalayarak önbellek kullanımını maksimize ediyoruz
COPY package*.json ./
# Daha hızlı npm install için ek parametreler - yalnızca üretim paketlerini kur
RUN npm config set cache /tmp/npm-cache --global && \
    npm ci --prefer-offline --no-audit --silent --no-optional --production && \
    npm cache clean --force

# Build aşaması: Derleme
FROM node:18-alpine AS builder
WORKDIR /app
# Önce node_modules kopyalanır - bu katman önbelleklenecek
COPY --from=deps /app/node_modules ./node_modules
# Derleme işlemini hızlandırmak için
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV GENERATE_SOURCEMAP=false
ENV CI=true
# Thread sayısını artırarak derleme hızını artırıyoruz
ENV NODE_OPTIONS="--max-old-space-size=4096 --max-http-header-size=16384"
# Kaynak kodları kopyala
COPY . .
# Build işlemini çalıştır
RUN npm run build

# Üretim aşaması: Minimal imaj
FROM nginx:alpine AS runtime
# Nginx'i hızlandırmak için
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx yapılandırması - inline olarak oluştur (Tek satırda)
RUN echo 'server { listen 80; server_name _; gzip on; gzip_types text/plain text/css application/json application/javascript text/xml application/xml; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; expires 1d; add_header Cache-Control "public, max-age=86400"; } location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { expires 30d; add_header Cache-Control "public, max-age=2592000"; } error_page 500 502 503 504 /50x.html; location = /50x.html { root /usr/share/nginx/html; } }' > /etc/nginx/conf.d/default.conf

# Gereksiz dosyaları temizle
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*
EXPOSE 80
# Nginx'i hafif modda başlat
CMD ["nginx", "-g", "daemon off;"]
