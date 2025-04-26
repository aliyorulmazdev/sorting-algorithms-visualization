pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'react-app:latest'
        K8S_NAMESPACE = 'default'
        DEPLOY_USER = 'deployuser'
    }
    stages {
        stage('Checkout Code') {
            steps {
                checkout([$class: 'GitSCM', 
                         branches: [[name: 'main']],
                         extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'src']],
                         userRemoteConfigs: [[url: 'https://github.com/aliyorulmazdev/sorting-algorithms-visualization.git']]])
            }
        }

        stage('Initialize Minikube') {
            steps {
                sh """
                    # Cleanup previous instance
                    sudo -u ${DEPLOY_USER} minikube delete || true
                    
                    # Start with optimized settings
                    sudo -u ${DEPLOY_USER} minikube start \
                        --driver=docker \
                        --container-runtime=containerd \
                        --memory=4000 \
                        --cpus=2 \
                        --addons=ingress,metrics-server \
                        --embed-certs=true
                    
                    # Configure kubectl access
                    sudo cp /home/${DEPLOY_USER}/.kube/config /var/lib/jenkins/.kube/
                    sudo chown jenkins:jenkins /var/lib/jenkins/.kube/config
                """
            }
        }

        stage('Build Image') {
            steps {
                sh """
                    # Use deployuser's docker environment
                    eval \$(sudo -u ${DEPLOY_USER} minikube docker-env)
                    
                    # Build with cache optimization
                    docker build \\
                        -t ${DOCKER_IMAGE} \\
                        --build-arg NODE_ENV=production \\
                        --no-cache \\
                        ./src
                """
            }
        }

        stage('Deploy Application') {
            steps {
                sh """
                    # Apply Kubernetes manifests
                    kubectl apply -f ./src/k8s/ -n ${K8S_NAMESPACE}
                    
                    # Wait for rollout
                    kubectl rollout status deployment/react-app -n ${K8S_NAMESPACE} --timeout=180s
                    
                    # Start tunnel in background
                    nohup sudo -u ${DEPLOY_USER} minikube tunnel >/dev/null 2>&1 &
                    sleep 15
                    
                    # Get service info
                    echo "### DEPLOYMENT STATUS ###"
                    kubectl get all -n ${K8S_NAMESPACE}
                    
                    echo "### APPLICATION URL ###"
                    sudo -u ${DEPLOY_USER} minikube service react-service --url -n ${K8S_NAMESPACE}
                """
            }
        }
    }
    post {
        always {
            sh '''
                # Cleanup tunnel
                sudo pkill -f "minikube tunnel" || true
                
                # Verify cleanup
                ps aux | grep "[m]inikube tunnel" || echo "No tunnel processes found"
            '''
            cleanWs()
        }
        failure {
            slackSend(
                color: 'danger',
                message: "FAILED: Job ${env.JOB_NAME} #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
            )
            sh '''
                echo "### ERROR DETAILS ###"
                kubectl describe pods -l app=react-app
                kubectl logs -l app=react-app --tail=100
            '''
        }
        success {
            slackSend(
                color: 'good',
                message: "SUCCESS: Job ${env.JOB_NAME} #${env.BUILD_NUMBER}\nDeployed: \$(minikube service react-service --url)"
            )
        }
    }
}
