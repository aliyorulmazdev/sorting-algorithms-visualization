pipeline {
    agent any
    environment {
        DOCKER_COMPOSE_VERSION = '2.21.0'
    }
    options {
        timeout(time: 10, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Ortam Hazırlığı') {
            steps {
                script {
                    sh '''
                        # Docker-compose kurulu mu kontrol et
                        if ! command -v docker-compose &> /dev/null; then
                            echo "Docker-compose kuruluyor..."
                            sudo curl -L "https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                            sudo chmod +x /usr/local/bin/docker-compose
                            docker-compose --version
                        else
                            echo "Docker-compose zaten kurulu."
                            docker-compose --version
                        fi
                    '''
                }
            }
        }
        stage('Temizlik') {
            steps {
                script {
                    sh '''
                        # Eski container'ı durdur ve sil
                        docker stop react-app || true
                        docker rm react-app || true
                        # Eski imajı kaldır
                        docker rmi -f react-app:latest || true
                    '''
                }
            }
        }
        stage('Docker Build & Deploy') {
            steps {
                script {
                    sh '''
                        # Docker compose ile build ve başlat
                        docker-compose up -d --build
                        
                        # Port kontrolü
                        echo "Port kontrolü:"
                        netstat -tuln | grep 30080 || echo "Port henüz dinlenmiyor, kontrol gerekli."
                        
                        # Container durumu
                        docker ps | grep react-app
                    '''
                }
            }
        }
        stage('Erişim Bilgisi') {
            steps {
                script {
                    def externalIp = sh(script: "curl -s ifconfig.me || hostname -I | awk '{print \$1}'", returnStdout: true).trim()
                    echo "===================================================="
                    echo "Uygulama dışarıdan erişilebilir: http://${externalIp}:30080"
                    echo "===================================================="
                }
            }
        }
    }
    post {
        success {
            echo "Deploy başarıyla tamamlandı!"
        }
        failure {
            echo "Deploy başarısız oldu! Logları kontrol edin."
            sh '''
                docker logs react-app || true
                docker-compose logs || true
            '''
        }
        always {
            cleanWs()
        }
    }
}