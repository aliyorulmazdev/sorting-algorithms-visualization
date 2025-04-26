pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'docker.io/library/react-app:latest'
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
                        sh """#!/bin/bash -e
                            # Docker daemon'ını çağırırken daha güvenli yol kullan
                            export DOCKER_HOST=\$(sudo -u ${DEPLOY_USER} minikube docker-env | grep DOCKER_HOST | cut -d '"' -f 2 | cut -d '=' -f 2)
                            export DOCKER_CERT_PATH=\$(sudo -u ${DEPLOY_USER} minikube docker-env | grep DOCKER_CERT_PATH | cut -d '"' -f 2 | cut -d '=' -f 2)
                            export DOCKER_TLS_VERIFY=1
                            
                            echo "Docker host: \${DOCKER_HOST}"
                            
                            # Build sürecini optimize ederek başlat
                            echo "Docker build başlıyor..."
                            # Build önbelleğini etkinleştir
                            sudo -u ${DEPLOY_USER} docker pull ${DOCKER_IMAGE} || echo "İmaj bulunamadı, sıfırdan oluşturulacak"
                            
                            # Docker imaj adını tüm komutlarda aynı şekilde kullan
                            sudo -u ${DEPLOY_USER} docker build \
                                --build-arg BUILDKIT_INLINE_CACHE=1 \
                                --cache-from ${DOCKER_IMAGE} \
                                --build-arg NODE_ENV=production \
                                --cpuset-cpus="0-3" \
                                --memory=4g \
                                -t ${DOCKER_IMAGE} \
                                -f ./docker/Dockerfile .
                                
                            # Image'ın doğru oluşturulduğundan emin ol ve Minikube'un görmesini sağla
                            sudo -u ${DEPLOY_USER} docker images | grep react-app
                            
                            # Yeni oluşturulan imajı Minikube içinde göster
                            sudo -u ${DEPLOY_USER} minikube ssh -- 'docker images | grep react-app'
                            
                            # Deployment komutlarını deployuser olarak çalıştır
                            echo "Kubernetes deployment başlıyor..."
                            # Önce varsa eski deployment'ı temizle
                            sudo -u ${DEPLOY_USER} kubectl delete -f ./k8s/react-deployment.yaml --ignore-not-found
                            sleep 5
                            
                            # Yeni deployment uygula
                            sudo -u ${DEPLOY_USER} kubectl apply -f ./k8s/react-deployment.yaml
                            
                            # Pod'ların durumunu kontrol et
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
                            
                            # Deployment kontrolü - daha uzun timeout ile (3 dakika)
                            echo "Deployment durumunu bekliyorum..."
                            sudo -u ${DEPLOY_USER} kubectl rollout status deployment/react-app --timeout=180s
                            
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
