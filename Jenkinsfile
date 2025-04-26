pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        DEPLOY_USER = 'deployuser'
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
                sh """
                    # Minikube'un Docker daemon'ını kullanmak için eval komutu çalıştır
                    eval \$(sudo -u ${DEPLOY_USER} minikube docker-env)
                    
                    # Build hızlandırma: Sadece gerekli temizleme işlemlerini yap
                    sudo -u ${DEPLOY_USER} minikube ssh -- 'docker image prune -f'
                    
                    # Docker build hızlandırma (paralel build ve layer caching aktif)
                    sudo -u ${DEPLOY_USER} docker build --no-cache=false --pull=false --build-arg BUILDKIT_INLINE_CACHE=1 -t ${DOCKER_IMAGE} -f ./docker/Dockerfile .
                    
                    # Deployment uygula (hızlı)
                    kubectl apply -f ./k8s/react-deployment.yaml --record
                    
                    # Deployment durumunu kontrol et (timeout azaltıldı)
                    kubectl rollout status deployment/react-app --timeout=30s
                    
                    # NodePort bilgisini al
                    MINIKUBE_IP=\$(sudo -u ${DEPLOY_USER} minikube ip)
                    
                    # Servis bilgisini görüntüle (NodePort için)
                    echo "Uygulamaya şu URL'den erişebilirsiniz:"
                    echo "APP URL: http://\${MINIKUBE_IP}:30080"
                """
            }
        }
    }
    post {
        always {
            sh """
                # Clean up işlemleri
                sudo pkill -f "minikube tunnel" || true
            """
            cleanWs(cleanWhenNotBuilt: false, deleteDirs: true, disableDeferredWipeout: true)
        }
    }
}
