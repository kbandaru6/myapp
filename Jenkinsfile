pipeline {
    agent any

    environment {
        IMAGE_NAME = "myapp-backend"
        IMAGE_TAG  = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend (Maven)') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                  docker build \
                    -t ${IMAGE_NAME}:${IMAGE_TAG} \
                    ./backend
                '''
            }
        }

        stage('Smoke Test Container') {
            steps {
                sh '''
                  docker run -d --rm \
                    --name backend-test \
                    -p 8081:8081 \
                    ${IMAGE_NAME}:${IMAGE_TAG}

                  sleep 10
                  curl -f http://localhost:8081/actuator/health || exit 1
                  docker stop backend-test
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Backend build successful'
        }
        failure {
            echo '❌ Backend build failed'
        }
    }
}
