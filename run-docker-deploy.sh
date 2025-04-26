#!/bin/bash
# React uygulamasını docker ile deploy etme scripti

echo "===== React Uygulama Docker Deploy ====="

# Çalışma dizinini belirle
APP_DIR=$(pwd)
echo "Çalışma dizini: $APP_DIR"

# Eski container'ları temizle
echo "Eski container'lar temizleniyor..."
docker stop react-app 2>/dev/null || true
docker rm react-app 2>/dev/null || true
docker rmi react-app:latest 2>/dev/null || true

# Build seçeneği
echo "Build tercihi?"
echo "1) Normal Dockerfile ile build (React)"
echo "2) Basit test Dockerfile ile build (Sadece Nginx)"
read -p "Seçiminiz (1/2): " BUILD_CHOICE

if [ "$BUILD_CHOICE" == "1" ]; then
    echo "React uygulaması build ediliyor..."
    docker build -t react-app:latest .
elif [ "$BUILD_CHOICE" == "2" ]; then
    echo "Basit test build ediliyor..."
    docker build -t react-app:latest -f simple-test.Dockerfile .
else
    echo "Geçersiz seçim. Çıkılıyor."
    exit 1
fi

# Container'ı başlat
echo "Container başlatılıyor..."
docker run -d -p 30080:80 --name react-app --restart always react-app:latest

# Kontrol
echo "Container durumu:"
docker ps | grep react-app

# Erişim bilgisi
IP=$(hostname -I | awk '{print $1}')
echo "=================================================="
echo "✅ Uygulama başarıyla deploy edildi!"
echo "🌐 Erişim adresi: http://$IP:30080"
echo "=================================================="
echo "Hatalar için container loglarını kontrol et:"
echo "docker logs react-app" 