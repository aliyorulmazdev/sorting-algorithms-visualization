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
                url: 'https://github.com/<KULLANICI_ADI>/<REPO_ADI>.git'
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
                withKubeConfig([credentialsId: 'kube-config']) {
                    sh 'kubectl apply -f react-deployment.yaml'
                    sh 'kubectl rollout restart deployment/react-app'
                }
            }
        }
    }
    post {
        success {
            slackSend channel: '#deployments',
                message: "Deployment Successful: ${env.BUILD_URL}"
        }
        failure {
            slackSend channel: '#deployments',
                message: "Deployment Failed: ${env.BUILD_URL}"
        }
    }
}
