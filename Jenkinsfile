pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        MINIKUBE_IP = '192.168.49.2' // Manuel olarak IP'yi sabitledik
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
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Kubeconfig dizini oluştur
                    mkdir -p ~/.kube
                    
                    # Kubeconfig dosyasını oluştur (IP'yi sabit kullanıyoruz)
                    cat > ~/.kube/config <<EOF
                    apiVersion: v1
                    clusters:
                    - cluster:
                        certificate-authority: /etc/jenkins_k8s/ca.crt
                        server: https://192.168.49.2:8443
                      name: minikube
                    contexts:
                    - context:
                        cluster: minikube
                        user: minikube
                      name: minikube
                    current-context: minikube
                    kind: Config
                    preferences: {}
                    users:
                    - name: minikube
                      user:
                        client-certificate: /etc/jenkins_k8s/client.crt
                        client-key: /etc/jenkins_k8s/client.key
                    EOF
                    
                    # İzinleri ayarla
                    chmod 600 ~/.kube/config
                    
                    # Bağlantıyı test et
                    kubectl cluster-info
                    
                    # Deployment'ı uygula
                    kubectl apply -f k8s/react-deployment.yaml
                    kubectl rollout status deployment/react-app --timeout=3m
                    
                    # Uygulama URL'sini göster
                    echo "Uygulama erişim URL'si: http://$(minikube service react-service --url)"
                '''
            }
        }
    }
    post {
        success {
            echo "Deployment Successful: ${BUILD_URL}"
        }
        failure {
            echo "Deployment Failed: ${BUILD_URL}"
        }
    }
}
