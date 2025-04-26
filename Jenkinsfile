pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/aliyorulmazdev/sorting-algorithms-visualization.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Minikube'in Docker daemon'ını kullan
                    sh 'eval $(minikube docker-env)'
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        
        stage('Prepare Kubernetes') {
            steps {
                sh '''
                    # Kubeconfig dizini oluştur
                    mkdir -p ~/.kube
                    
                    # Minikube kubeconfig'ini kopyala
                    minikube kubectl -- config view --raw > ~/.kube/config
                    
                    # İzinleri ayarla
                    chmod 600 ~/.kube/config
                    
                    # Bağlantıyı test et
                    kubectl cluster-info
                    kubectl get nodes
                '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Deployment ve Service dosyalarını uygula
                    kubectl apply -f k8s/react-deployment.yaml
                    
                    # Servis yoksa oluştur
                    if ! kubectl get svc react-service -n ${K8S_NAMESPACE}; then
                        kubectl expose deployment react-app \
                            --name=react-service \
                            --type=LoadBalancer \
                            --port=80 \
                            --target-port=80 \
                            -n ${K8S_NAMESPACE}
                    fi
                    
                    # Deployment durumunu kontrol et
                    kubectl rollout status deployment/react-app -n ${K8S_NAMESPACE} --timeout=3m
                    
                    # Minikube tunnel başlat (arka planda)
                    nohup minikube tunnel >/dev/null 2>&1 &
                    
                    # URL bilgisini göster
                    echo "Uygulama erişim bilgileri:"
                    kubectl get svc react-service -n ${K8S_NAMESPACE} -o wide
                    echo "Erişim URL'si: http://$(minikube service react-service --url -n ${K8S_NAMESPACE} | head -n1)"
                '''
            }
        }
    }
    post {
        success {
            echo "Deployment Successful: ${BUILD_URL}"
            sh '''
                echo "Son durum:"
                kubectl get all -n ${K8S_NAMESPACE}
            '''
        }
        failure {
            echo "Deployment Failed: ${BUILD_URL}"
            sh '''
                echo "Hata detayları:"
                kubectl describe deployment/react-app -n ${K8S_NAMESPACE}
                kubectl get events -n ${K8S_NAMESPACE} --sort-by=.metadata.creationTimestamp
            '''
        }
        always {
            sh '''
                # Tunnel process'ini temizle
                pkill -f "minikube tunnel" || true
            '''
        }
    }
}
