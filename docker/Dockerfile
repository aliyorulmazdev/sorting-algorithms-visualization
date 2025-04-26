# Build stage
FROM node:18-alpine AS builder
# Layer caching için önce bağımlılıkları kopyala ve kur
WORKDIR /app
COPY package*.json ./
# npm ci yerine normal npm install kullanımı
RUN npm install --production=false --silent

# Sadece derleme için gerekli dosyaları kopyala
COPY public ./public
COPY src ./src

# Build süresini kısaltmak için önbelleği kullan
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# Sadece gerekli dosyaları içeren minimal üretim imajı
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
# Nginx'i hafif modda başlatma
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
