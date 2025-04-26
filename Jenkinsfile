pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        K8S_MANIFEST_FILE = 'k8s/react-deployment.yaml'
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
        
        stage('Setup Minikube Environment') {
            steps {
                script {
                    // Minikube Docker environment setup
                    def minikubeEnv = sh(script: 'minikube docker-env', returnStdout: true).trim()
                    env.MINIKUBE_DOCKER_ENV = minikubeEnv
                }
                sh '''
                    # Apply Minikube docker environment
                    eval ${MINIKUBE_DOCKER_ENV}
                    docker info
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh '''
                    # Build with Minikube's Docker
                    docker build -t ${DOCKER_IMAGE} .
                    docker images | grep react-app
                '''
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    # Configure kubectl
                    minikube kubectl -- config view --raw > ~/.kube/config
                    chmod 600 ~/.kube/config
                    
                    # Verify cluster access
                    kubectl cluster-info
                    kubectl get nodes
                    
                    # Apply Kubernetes manifests
                    kubectl apply -f ${K8S_MANIFEST_FILE} -n ${K8S_NAMESPACE}
                    
                    # Wait for deployment
                    kubectl rollout status deployment/react-app -n ${K8S_NAMESPACE} --timeout=3m
                    
                    # Start Minikube tunnel in background
                    nohup minikube tunnel >/dev/null 2>&1 &
                    sleep 10  # Wait for tunnel to establish
                    
                    # Get service info
                    echo "Deployment and Service status:"
                    kubectl get deployment,svc -n ${K8S_NAMESPACE} -l app=react-app
                    
                    # Get application URL
                    echo "Application URL:"
                    minikube service react-service --url -n ${K8S_NAMESPACE} || true
                '''
            }
        }
    }
    post {
        always {
            sh '''
                # Cleanup tunnel process
                pkill -f "minikube tunnel" || true
            '''
            cleanWs()
        }
        success {
            echo "Deployment Successful: ${BUILD_URL}"
            // Remove slackSend if plugin not installed
        }
        failure {
            echo "Deployment Failed: ${BUILD_URL}"
            sh '''
                echo "Error details:"
                kubectl describe deployment/react-app -n ${K8S_NAMESPACE} || true
                kubectl logs -l app=react-app -n ${K8S_NAMESPACE} --tail=50 || true
            '''
        }
    }
}
