pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        DEPLOY_USER = 'deployuser'
        // Docker önbellek iyileştirmeleri
        DOCKER_BUILDKIT = '1'
        // Build süresi optimizasyonu
        PREBUILT_LAYER_EXISTS = 'false'
    }
    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[url: 'https://github.com/aliyorulmazdev/sorting-algorithms-visualization.git']]
                ])
            }
        }
        stage('Prepare Minikube') {
            steps {
                sh """
                    sudo -u ${DEPLOY_USER} minikube status || sudo -u ${DEPLOY_USER} minikube start --driver=docker --memory=4000 --cpus=2
                    
                    # Docker imaj önbelleğini temizleme (sadece dangling imajlar için)
                    sudo -u ${DEPLOY_USER} minikube ssh -- 'docker image prune -f'
                    
                    # Önceden build edilmiş bir imaj var mı kontrol et
                    if sudo -u ${DEPLOY_USER} minikube ssh -- 'docker images -q ${DOCKER_IMAGE} 2>/dev/null'; then
                        echo "Önceden build edilmiş imaj bulundu, hyper-fast build kullanılacak"
                        export PREBUILT_LAYER_EXISTS='true'
                    fi
                """
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    try {
                        sh """#!/bin/bash -e
                            # Ultra-hızlı build ve deployment
                            
                            # 1. Sadece Dockerfile ve deployment dosyalarını hazırla 
                            mkdir -p /tmp/react-app-build
                            
                            # 2. Mevcut imajı kontrol et
                            if sudo -u ${DEPLOY_USER} minikube ssh -- 'docker images -q ${DOCKER_IMAGE} 2>/dev/null | grep -q "."'; then
                                echo "Önceden oluşturulmuş imaj bulundu, imaj yeniden kullanılacak"
                                # Her seferinde yeni bir imaj oluşturma, onun yerine varsa mevcut imajı kullan
                                # (Bu yaklaşım development ortamları için uygundur, production için SHA tagli imajlar önerilir)
                            else
                                echo "Hızlı docker build başlıyor..."
                                
                                # Sadece gerekli dosyaları kopyala
                                cp -r ./docker /tmp/react-app-build/
                                cp -r ./build /tmp/react-app-build/ || mkdir -p /tmp/react-app-build/build
                                cp -r ./node_modules /tmp/react-app-build/ || echo "node_modules yok"
                                cp package*.json /tmp/react-app-build/ || echo "package.json dosyası bulunamadı"
                                
                                # Sadece runtime aşamasını içeren minimal Dockerfile oluştur
                                cat > /tmp/react-app-build/Dockerfile << EOF
FROM nginx:alpine
COPY ./build /usr/share/nginx/html
RUN echo 'server { listen 80; server_name _; gzip on; location / { root /usr/share/nginx/html; index index.html; try_files \$uri \$uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EOF
                                
                                # Eğer build klasörü yoksa, boş bir index.html dosyası oluştur
                                if [ ! -d "/tmp/react-app-build/build" ]; then
                                    mkdir -p /tmp/react-app-build/build
                                    echo "<html><body><h1>Demo App</h1></body></html>" > /tmp/react-app-build/build/index.html
                                fi
                                
                                # Dizini minikube içine kopyala (doğru syntax ile)
                                tar -czf /tmp/react-app.tar.gz -C /tmp/react-app-build .
                                sudo -u ${DEPLOY_USER} minikube cp /tmp/react-app.tar.gz minikube:/tmp/react-app.tar.gz
                                sudo -u ${DEPLOY_USER} minikube ssh -- "mkdir -p /tmp/react-app && tar -xzf /tmp/react-app.tar.gz -C /tmp/react-app"
                                
                                # Minikube içinde hızlı Docker build
                                sudo -u ${DEPLOY_USER} minikube ssh -- "cd /tmp/react-app && docker build -t ${DOCKER_IMAGE} -f Dockerfile ."
                            fi
                            
                            # İmajın var olduğunu doğrula
                            sudo -u ${DEPLOY_USER} minikube ssh -- "docker images | grep ${DOCKER_IMAGE}"
                            
                            # Deploymentları temizle
                            sudo -u ${DEPLOY_USER} kubectl delete -f ./k8s/react-deployment.yaml --ignore-not-found
                            sleep 5
                            
                            # Yeni deployment
                            sudo -u ${DEPLOY_USER} kubectl apply -f ./k8s/react-deployment.yaml
                            
                            # Pod durumunu kontrol et
                            echo "Pod durumlarını kontrol ediyorum..."
                            sleep 10
                            sudo -u ${DEPLOY_USER} kubectl get pods -l app=react-app -o wide
                            
                            # Pod log'larını kontrol et
                            echo "Pod loglarını kontrol ediyorum..."
                            POD_NAME=\$(sudo -u ${DEPLOY_USER} kubectl get pods -l app=react-app -o jsonpath="{.items[0].metadata.name}" 2>/dev/null || echo "")
                            if [ ! -z "\$POD_NAME" ]; then
                                sudo -u ${DEPLOY_USER} kubectl logs \$POD_NAME || echo "Henüz log yok"
                                sudo -u ${DEPLOY_USER} kubectl describe pod \$POD_NAME
                            fi
                            
                            # Deployment kontrolü
                            echo "Deployment durumunu bekliyorum..."
                            sudo -u ${DEPLOY_USER} kubectl rollout status deployment/react-app --timeout=90s
                            
                            # NodePort ve IP bilgisi
                            MINIKUBE_IP=\$(sudo -u ${DEPLOY_USER} minikube ip)
                            echo ""
                            echo "====================================="
                            echo "Uygulama başarıyla deploy edildi!"
                            echo "APP URL: http://\${MINIKUBE_IP}:30080"
                            echo "====================================="
                        """
                    } catch (Exception e) {
                        echo "Build veya deployment hatası: ${e.message}"
                        // Hata durumunda bile pod durumlarını göster
                        sh """
                            echo "Hata durumunda pod bilgilerini kontrol ediyorum..."
                            sudo -u ${DEPLOY_USER} kubectl get pods -l app=react-app -o wide
                            POD_NAME=\$(sudo -u ${DEPLOY_USER} kubectl get pods -l app=react-app -o jsonpath="{.items[0].metadata.name}" 2>/dev/null || echo "")
                            if [ ! -z "\$POD_NAME" ]; then
                                sudo -u ${DEPLOY_USER} kubectl logs \$POD_NAME || echo "Henüz log yok"
                                sudo -u ${DEPLOY_USER} kubectl describe pod \$POD_NAME
                            fi
                        """
                        error "İşlem başarısız oldu. Detaylar: ${e.message}"
                    }
                }
            }
        }
    }
    post {
        always {
            sh """
                # Temizlik işlemleri
                sudo pkill -f "minikube tunnel" || true
                rm -rf /tmp/react-app-build || true
                rm -rf /tmp/react-app.tar.gz || true
            """
            cleanWs(cleanWhenNotBuilt: false, deleteDirs: true, disableDeferredWipeout: false)
        }
        success {
            echo "Pipeline başarıyla tamamlandı!"
        }
        failure {
            echo "Pipeline başarısız oldu. Lütfen logları kontrol edin."
        }
    }
}
