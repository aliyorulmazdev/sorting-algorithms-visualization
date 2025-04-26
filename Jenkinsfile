pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        DEPLOY_USER = 'deployuser'
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
                    mkdir -p /var/lib/jenkins/.kube
                    sudo cp /home/${DEPLOY_USER}/.kube/config /var/lib/jenkins/.kube/config
                    sudo chown -R jenkins:jenkins /var/lib/jenkins/.kube
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
                            
                            # Docker temizliği
                            sudo -u ${DEPLOY_USER} minikube ssh -- 'docker image prune -f'
                            
                            # Build sürecini daha détayli göster
                            echo "Docker build başlıyor..."
                            sudo -u ${DEPLOY_USER} docker build --no-cache=false --progress=plain --build-arg BUILDKIT_INLINE_CACHE=1 -t ${DOCKER_IMAGE} -f ./docker/Dockerfile .
                            
                            # Deployment hızlı uygula
                            kubectl apply -f ./k8s/react-deployment.yaml --record
                            
                            # Deployment kontrolü
                            kubectl rollout status deployment/react-app --timeout=30s
                            
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
