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
                    sudo -u ${DEPLOY_USER} minikube status || sudo -u ${DEPLOY_USER} minikube start \\
                        --driver=docker \\
                        --memory=4000 \\
                        --cpus=2
                    mkdir -p /var/lib/jenkins/.kube
                    sudo cp /home/${DEPLOY_USER}/.kube/config /var/lib/jenkins/.kube/config
                    sudo chown -R jenkins:jenkins /var/lib/jenkins/.kube
                """
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build Docker image using the host Docker (not Minikube's Docker)
                sh """
                    # Minikube'un Docker Image registry'sine erişmek için port-forward kullanın
                    sudo -u ${DEPLOY_USER} minikube ssh -- docker system prune -af
                    
                    # Ana sistem Docker'ını kullanarak image'ı build edin
                    docker build -t ${DOCKER_IMAGE} -f ./docker/Dockerfile .
                    
                    # Image'ı save edip Minikube içine load edin
                    docker save ${DOCKER_IMAGE} | sudo -u ${DEPLOY_USER} minikube ssh -- docker load
                """
            }
        }
        stage('Deploy to Minikube') {
            steps {
                sh """
                    kubectl apply -f ./k8s/react-deployment.yaml
                    kubectl rollout status deployment/react-app --timeout=2m
                    
                    nohup sudo -u ${DEPLOY_USER} minikube tunnel >/dev/null 2>&1 &
                    sleep 10
                    echo "APP URL: \$(sudo -u ${DEPLOY_USER} minikube service react-service --url)"
                """
            }
        }
    }
    post {
        always {
            sh """
                sudo pkill -f "minikube tunnel" || true
            """
            cleanWs()
        }
    }
}
