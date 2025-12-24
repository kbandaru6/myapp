pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'myapp-backend'
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
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE ./backend'
            }
        }

        stage('Run Backend (Smoke Test)') {
            steps {
                sh '''
                  docker rm -f backend-test || true
                  docker run -d --name backend-test -p 8081:8081 $BACKEND_IMAGE
                  sleep 10
                  curl -f http://localhost:8081/actuator/health || exit 1
                '''
            }
        }
    }

    post {
        always {
            sh 'docker rm -f backend-test || true'
            echo 'Pipeline finished.'
        }
    }
}
