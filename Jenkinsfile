pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        KUBE_CONFIG = credentials('kube-config')
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
                    mkdir -p ~/.kube
                    echo "$KUBE_CONFIG" > ~/.kube/config
                    kubectl apply -f k8s/react-deployment.yaml
                    kubectl rollout status deployment/react-app
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
