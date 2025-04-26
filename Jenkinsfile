pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM', 
                         branches: [[name: 'main']],
                         extensions: [],
                         userRemoteConfigs: [[url: 'https://github.com/aliyorulmazdev/sorting-algorithms-visualization.git']]])
            }
        }

        stage('Start Minikube') {
            steps {
                sh '''
                    # Minikube'i başlat veya durumunu kontrol et
                    minikube status || minikube start --driver=docker
                    minikube addons enable ingress
                '''
            }
        }

        stage('Setup Environment') {
            steps {
                script {
                    // Docker environment ayarlarını al
                    env.DOCKER_ENV = sh(script: 'minikube docker-env', returnStdout: true).trim()
                    // Kubeconfig'i ayarla
                    sh '''
                        mkdir -p ~/.kube
                        minikube kubectl -- config view --flatten > ~/.kube/config
                        chmod 600 ~/.kube/config
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    # Minikube'in Docker environment'ını kullan
                    eval $(minikube docker-env)
                    docker build -t ${DOCKER_IMAGE} .
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Deployment'ı uygula
                    kubectl apply -f k8s/react-deployment.yaml
                    
                    # Durumu kontrol et
                    kubectl rollout status deployment/react-app --timeout=3m
                    
                    # Tunnel'ı başlat
                    nohup minikube tunnel >/dev/null 2>&1 &
                    sleep 10
                    
                    # Servis bilgilerini göster
                    echo "Application URL:"
                    minikube service react-service --url
                '''
            }
        }
    }
    post {
        always {
            sh '''
                # Tunnel'ı temizle
                pkill -f "minikube tunnel" || true
            '''
            cleanWs()
        }
        failure {
            sh '''
                echo "=== HATA DETAYLARI ==="
                kubectl get pods --all-namespaces
                kubectl describe deployment/react-app
                kubectl logs -l app=react-app --tail=50
            '''
        }
    }
}
