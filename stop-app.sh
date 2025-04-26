#!/bin/bash
# React uygulamasını durdurma scripti

echo "React uygulaması durduruluyor..."

# Docker Compose ile durdurup sil
docker-compose down

# Container'ı durdurup sil (eğer compose dosyası yoksa)
docker stop react-app 2>/dev/null || true
docker rm react-app 2>/dev/null || true

echo ""
echo "✅ Uygulama başarıyla durduruldu!"
echo "Container ve port serbest bırakıldı." 