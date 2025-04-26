#!/bin/bash
# React uygulamasını başlatma scripti

# Değişkenleri ayarla
APP_DIR=$(pwd)
PORT=30080

echo "React uygulaması başlatılıyor..."

# Eski container'ı durdur
docker stop react-app 2>/dev/null || true
docker rm react-app 2>/dev/null || true

# Docker Compose ile uygulamayı başlat
cd $APP_DIR
docker-compose up -d --build

# Port kontrolü
echo "Port kontrolü..."
sleep 2
netstat -tuln | grep $PORT || echo "⚠️ Port henüz dinlenmiyor, daha sonra kontrol edin!"

# Container durumu
echo ""
echo "Container durumu:"
docker ps | grep react-app || echo "⚠️ Container başlatılamadı!"

# Başarılı mesajı
IP=$(hostname -I | awk '{print $1}')
echo ""
echo "========================================================"
echo "✅ Uygulama başarıyla başlatıldı!"
echo "🌐 Erişim adresi: http://$IP:$PORT"
echo "========================================================" 