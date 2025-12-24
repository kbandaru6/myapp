pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'app-backend'
        IMAGE_TAG = 'latest'
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
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                  docker build \
                    -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                    ./backend
                """
            }
        }
    }

    post {
        success {
            echo '✅ Backend image built successfully'
        }
        failure {
            echo '❌ Backend build failed'
        }
    }
}
