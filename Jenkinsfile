pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'app-backend'
    }

    stages {
        stage('Checkout') {
            steps {
                sshagent(['GitPem']) { // <-- Use your Jenkins SSH credential ID
                    checkout scm
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${env.BACKEND_IMAGE} backend"
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh 'docker-compose up -d --build'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline succeeded!'
        }
        failure {
            echo '❌ Pipeline failed.'
        }
    }
}
