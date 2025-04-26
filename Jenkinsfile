pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        DEPLOY_USER = 'deployuser'
        // Docker önbellek iyileştirmeleri
        DOCKER_BUILDKIT = '1'
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
                """
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    try {
                        // Docker build dosyalarını hazırla
                        sh """
                            # Çalışma dizinini geçici bir dizine kopyala
                            mkdir -p /tmp/react-build
                            cp -r . /tmp/react-build/
                            
                            # Minikube'a şimdi dosyaları kopyala
                            sudo -u ${DEPLOY_USER} minikube ssh -- "mkdir -p /home/docker/app"
                            sudo -u ${DEPLOY_USER} minikube cp /tmp/react-build/. :/home/docker/app
                            
                            # Minikube içinde Docker build komutunu çalıştır
                            sudo -u ${DEPLOY_USER} minikube ssh -- "cd /home/docker/app && docker build -t ${DOCKER_IMAGE} -f ./docker/Dockerfile ."
                            
                            # İmajın oluşturulduğundan emin ol
                            sudo -u ${DEPLOY_USER} minikube ssh -- "docker images | grep react-app"
                            
                            # Deployment dosyasını düzenle
                            sed -i 's|docker.io/library/react-app:latest|react-app:latest|g' ./k8s/react-deployment.yaml
                            
                            # Deploymentları temizle
                            sudo -u ${DEPLOY_USER} kubectl delete -f ./k8s/react-deployment.yaml --ignore-not-found
                            sleep 10
                            
                            # Yeni deployment
                            sudo -u ${DEPLOY_USER} kubectl apply -f ./k8s/react-deployment.yaml
                            
                            # Pod durumunu kontrol et
                            echo "Pod durumlarını kontrol ediyorum..."
                            sleep 15
                            sudo -u ${DEPLOY_USER} kubectl get pods -l app=react-app -o wide
                            
                            # Pod log'larını kontrol et
                            echo "Pod loglarını kontrol ediyorum..."
                            POD_NAME=\$(sudo -u ${DEPLOY_USER} kubectl get pods -l app=react-app -o jsonpath="{.items[0].metadata.name}" 2>/dev/null || echo "")
                            if [ ! -z "\$POD_NAME" ]; then
                                sudo -u ${DEPLOY_USER} kubectl logs \$POD_NAME || echo "Henüz log yok"
                                sudo -u ${DEPLOY_USER} kubectl describe pod \$POD_NAME
                            fi
                            
                            # Deployment kontrolü - daha uzun timeout ile (4 dakika)
                            echo "Deployment durumunu bekliyorum..."
                            sudo -u ${DEPLOY_USER} kubectl rollout status deployment/react-app --timeout=240s
                            
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
                rm -rf /tmp/react-build || true
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
