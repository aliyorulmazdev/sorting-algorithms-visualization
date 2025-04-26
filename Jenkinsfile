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
                        sudo pkill -f "minikube tunnel" || true
                        nohup sudo -u ${DEPLOY_USER} minikube tunnel --cleanup --bind-address=0.0.0.0 &
                        if command -v firewall-cmd >/dev/null 2>&1; then
                          sudo firewall-cmd --add-port=30080/tcp --permanent || true
                          sudo firewall-cmd --reload || true
                        fi
                        sleep 3
                    '''
                }
            }
        }
        stage('Erişim Bilgisi') {
            steps {
                script {
                    def ip = sh(script: "sudo -u ${DEPLOY_USER} minikube ip", returnStdout: true).trim()
                    echo "Uygulama dışarıdan erişilebilir: http://${ip}:30080"
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