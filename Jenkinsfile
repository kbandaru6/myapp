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

        stage('Smoke Test Container') {
            steps {
                sh """
                  docker run -d --rm \
                    --name backend-test \
                    -p 8081:8081 \
                    ${BACKEND_IMAGE}:${IMAGE_TAG}

                  sleep 10
                  curl -f http://localhost:8081/actuator/health || exit 1
                  docker stop backend-test
                """
            }
        }
    }

    post {
        success {
            echo '✅ Backend pipeline succeeded!'
        }
        failure {
            echo '❌ Backend pipeline failed.'
        }
    }
}
