pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'app-backend'
        FRONTEND_IMAGE = 'app-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh './mvnw clean package'
                }
            }
        }

        stage('Build Frontend (Docker-only)') {
            steps {
                sh '''
                  docker build -t $FRONTEND_IMAGE ./frontend
                '''
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh '''
                  docker build -t $BACKEND_IMAGE ./backend
                '''
            }
        }

        stage('Run Docker Compose') {
            steps {
                sh '''
                  docker-compose down
                  docker-compose up -d --build
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
