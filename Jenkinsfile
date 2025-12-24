pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'app-backend'
        FRONTEND_IMAGE = 'app-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                sshagent(['git']) { // <-- Use your Jenkins SSH credential ID
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

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'docker run --rm -v "$PWD:/app" -w /app node:18 npm install'
                    sh 'docker run --rm -v "$PWD:/app" -w /app node:18 npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${env.BACKEND_IMAGE} backend"
                sh "docker build -t ${env.FRONTEND_IMAGE} frontend"
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
