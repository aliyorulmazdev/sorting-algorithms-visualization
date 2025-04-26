pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        K8S_MANIFEST_FILE = 'k8s/react-deployment.yaml'  // Yeni YAML dosyanızın yolu
    }
    stages {
        stage('Checkout Code') {
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
                    docker.build("${DOCKER_IMAGE}")
                }
            }
        }
        
        stage('Prepare Kubernetes') {
            steps {
                sh '''
                    # Minikube context'ini ayarla
                    minikube update-context
                    
                    # Cluster bilgilerini kontrol et
                    kubectl cluster-info
                    kubectl get nodes
                '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh """
                    # Kubernetes manifest'ini uygula
                    kubectl apply -f ${K8S_MANIFEST_FILE} -n ${K8S_NAMESPACE}
                    
                    # Deployment durumunu kontrol et
                    kubectl rollout status deployment/react-app -n ${K8S_NAMESPACE} --timeout=3m
                    
                    # LoadBalancer için tunnel başlat (arka planda)
                    nohup minikube tunnel >/dev/null 2>&1 &
                    
                    # Servis bilgilerini göster
                    echo "Deployment ve Service durumu:"
                    kubectl get deployment,svc -n ${K8S_NAMESPACE} -l app=react-app
                    
                    # Erişim URL'sini al
                    echo "Uygulama erişim URL'si:"
                    minikube service react-service --url -n ${K8S_NAMESPACE} | head -n1
                """
            }
        }
    }
    post {
        always {
            sh '''
                # Tunnel process'ini temizle
                pkill -f "minikube tunnel" || true
            '''
        }
        success {
            slackSend(color: 'good', message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'")
        }
        failure {
            slackSend(color: 'danger', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'")
            sh '''
                # Hata detaylarını göster
                kubectl describe deployment/react-app -n ${K8S_NAMESPACE}
                kubectl logs -l app=react-app -n ${K8S_NAMESPACE} --tail=50
            '''
        }
    }
}
