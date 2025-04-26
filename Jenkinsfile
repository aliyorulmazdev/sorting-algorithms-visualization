pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        DEPLOY_USER = 'deployuser'
    }
    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Minikube Başlat') {
            steps {
                script {
                    sh '''
                        sudo -u ${DEPLOY_USER} minikube status || \
                        sudo -u ${DEPLOY_USER} minikube start --driver=docker --listen-address=0.0.0.0 --extra-config=apiserver.service-node-port-range=1-65535
                    '''
                }
            }
        }
        stage('Temizlik') {
            steps {
                script {
                    sh '''
                        sudo -u ${DEPLOY_USER} kubectl delete -f ./k8s/react-deployment.yaml --ignore-not-found --wait=false || true
                        sudo -u ${DEPLOY_USER} kubectl delete svc react-service --ignore-not-found --wait=false || true
                        sudo -u ${DEPLOY_USER} minikube ssh -- "docker rmi -f ${DOCKER_IMAGE} || true"
                        sleep 2
                    '''
                }
            }
        }
        stage('Docker Build & Minikube Image') {
            steps {
                script {
                    sh '''
                        # Build React app ve Docker image
                        docker build -t ${DOCKER_IMAGE} .
                        # Image'ı minikube'a kopyala
                        docker save ${DOCKER_IMAGE} | sudo -u ${DEPLOY_USER} minikube image load -
                    '''
                }
            }
        }
        stage('K8s Deploy') {
            steps {
                script {
                    sh '''
                        sudo -u ${DEPLOY_USER} kubectl apply -f ./k8s/react-deployment.yaml
                        sleep 5
                        sudo -u ${DEPLOY_USER} kubectl rollout status deployment/react-app --timeout=60s || true
                    '''
                }
            }
        }
        stage('Tunnel & Port Aç') {
            steps {
                script {
                    sh '''
                        # Önce tüm tunnel işlemlerini temizle
                        sudo pkill -f "minikube tunnel" || true
                        sudo killall -9 minikube || true
                        ps aux | grep -i minikube | grep -v grep | awk '{print $2}' | xargs -r sudo kill -9 || true
                        sleep 2
                        
                        # Tunnel'ı doğru şekilde başlat (arka planda)
                        nohup sudo -u ${DEPLOY_USER} minikube tunnel --cleanup > /var/log/minikube-tunnel.log 2>&1 &
                        echo "Tunnel başlatıldı..."
                        sleep 5
                        
                        # Port açma
                        if command -v firewall-cmd >/dev/null 2>&1; then
                          sudo firewall-cmd --zone=public --add-port=30080/tcp --permanent || true
                          sudo firewall-cmd --reload || true
                        fi
                        
                        # Port açıklığını kontrol et
                        echo "Port kontrolü:"
                        sudo netstat -tuln | grep 30080 || echo "Port henüz dinlenmiyor. Manuel kontrol gerekli."
                    '''
                }
            }
        }
        stage('Erişim Bilgisi') {
            steps {
                script {
                    def externalIp = sh(script: "curl -s ifconfig.me || hostname -I | awk '{print \$1}'", returnStdout: true).trim()
                    echo "Uygulama dışarıdan erişilebilir: http://${externalIp}:30080"
                    echo "NOT: Tunnel işlemi arka planda çalışıyor. Port açık değilse, şu komutu çalıştırın:"
                    echo "sudo -u ${DEPLOY_USER} minikube tunnel --cleanup"
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}