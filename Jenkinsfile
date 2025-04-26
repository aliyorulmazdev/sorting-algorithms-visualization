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
        stage('Build Docker Image') {
            steps {
                sh """
                    # Minikube'un Docker daemon'ını kullanmak için eval komutu çalıştır
                    eval \$(sudo -u ${DEPLOY_USER} minikube docker-env)
                    
                    # Docker sistem temizleme
                    sudo -u ${DEPLOY_USER} minikube ssh -- docker system prune -af
                    
                    # Minikube'un Docker daemon'ını kullanarak image'ı oluştur
                    sudo -u ${DEPLOY_USER} docker build -t ${DOCKER_IMAGE} -f ./docker/Dockerfile .
                """
            }
        }
        stage('Deploy to Minikube') {
            steps {
                sh """
                    # Apply k8s configuration
                    kubectl apply -f ./k8s/react-deployment.yaml
                    
                    # Wait for the deployment to complete
                    kubectl rollout status deployment/react-app --timeout=3m
                    
                    # Start minikube tunnel in background to expose the LoadBalancer service
                    nohup sudo -u ${DEPLOY_USER} minikube tunnel > /tmp/minikube-tunnel.log 2>&1 &
                    sleep 15
                    
                    # Display service URL
                    echo "APP URL: \$(kubectl get service react-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}'):80"
                """
            }
        }
    }
    post {
        always {
            sh """
                # Clean up minikube tunnel process
                sudo pkill -f "minikube tunnel" || true
            """
            cleanWs()
        }
    }
}
