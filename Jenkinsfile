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
                    extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'app']],
                    userRemoteConfigs: [[url: 'https://github.com/aliyorulmazdev/sorting-algorithms-visualization.git']]
                ])
            }
        }

        stage('Minikube Setup') {
            steps {
                sh """
                    # Cleanup
                    sudo -u ${DEPLOY_USER} minikube delete || true
                    
                    # Start Minikube with optimized config
                    sudo -u ${DEPLOY_USER} minikube start \
                        --driver=docker \
                        --memory=4000 \
                        --cpus=2 \
                        --addons=ingress,metrics-server
                    
                    # Configure access
                    sudo cp /home/${DEPLOY_USER}/.kube/config /var/lib/jenkins/.kube/
                    sudo chown jenkins:jenkins /var/lib/jenkins/.kube/config
                """
            }
        }

        stage('Build') {
            steps {
                sh """
                    eval \$(sudo -u ${DEPLOY_USER} minikube docker-env)
                    # Mevcut dizindeki dosyaları kullanarak build
                    docker build -t ${DOCKER_IMAGE} -f ./Dockerfile .
                    
                    # Nginx.conf kontrolü
                    if [ ! -f ./nginx.conf ]; then
                        echo "ERROR: nginx.conf bulunamadı!" && exit 1
                    fi
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                    kubectl apply -f ./app/k8s/
                    kubectl rollout status deployment/react-app --timeout=2m
                    
                    # Start tunnel and get URL
                    nohup sudo -u ${DEPLOY_USER} minikube tunnel >/dev/null 2>&1 &
                    sleep 15
                    echo "APP URL: \$(sudo -u ${DEPLOY_USER} minikube service react-service --url)"
                """
            }
        }
    }
    post {
        always {
            sh 'sudo pkill -f "minikube tunnel" || true'
            cleanWs()
        }
    }
}
