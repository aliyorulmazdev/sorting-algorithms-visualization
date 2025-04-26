#!/bin/bash

# Bu script, react-app pod'unu siler ve yeniden oluşturur
# Çalıştırmak için: sudo -u deployuser ./update-pod.sh

# Mevcut imajı kontrol et
echo "Mevcut Docker imajını kontrol ediyorum..."
minikube ssh -- "docker images | grep react-app:latest || echo 'İmaj bulunamadı'"

# Yeni imaj oluştur
echo "Yeni Docker imajı oluşturuyorum..."
mkdir -p /tmp/react-app-build/build
echo "<html><body><h1>Demo App - Updated</h1></body></html>" > /tmp/react-app-build/build/index.html

# Dockerfile oluştur
cat > /tmp/react-app-build/Dockerfile << EOF
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY ./build /usr/share/nginx/html
RUN echo 'server { listen 80 default_server; server_name _; root /usr/share/nginx/html; location / { try_files \$uri \$uri/ /index.html; index index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF

# Dizini minikube içine kopyala
tar -czf /tmp/react-app.tar.gz -C /tmp/react-app-build .
minikube cp /tmp/react-app.tar.gz minikube:/tmp/react-app.tar.gz

# Minikube içinde dizin oluştur ve dosyaları çıkart
minikube ssh -- "mkdir -p /tmp/react-app && tar -xzf /tmp/react-app.tar.gz -C /tmp/react-app"

# Minikube içinde Docker build
minikube ssh -- "cd /tmp/react-app && docker build -t react-app:latest -f Dockerfile ."

# Doğrulama
minikube ssh -- "docker images | grep react-app:latest"

# Mevcut pod'u sil
echo "Mevcut pod'u siliyorum..."
kubectl delete pod -l app=react-app

# Deployment durumunu bekle
echo "Deployment durumunu bekliyorum..."
sleep 5
kubectl get pods -l app=react-app -o wide

# Uygulama URL'si
MINIKUBE_IP=$(minikube ip)
echo ""
echo "====================================="
echo "Uygulama deploy edildi!"
echo "APP URL: http://${MINIKUBE_IP}:30080"
echo "=====================================" 