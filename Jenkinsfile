pipeline {
    agent any

    environment {
        BACKEND_IMAGE = 'app-backend'
        FRONTEND_IMAGE = 'app-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                sshagent(['GitPem']) { // <-- Use your Jenkins SSH credential ID
                    checkout scm
                }
            }
        }

        stage('Sanity Check Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
                sh 'ls -la frontend || true'
                sh 'find . -maxdepth 4 -name package.json -print'
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
      sh '''
        set -eux
        ls -la
        docker run --rm \
          -v "$PWD:/app" \
          -w /app \
          node:18 npm ci
        docker run --rm \
          -v "$PWD:/app" \
          -w /app \
          node:18 npm run build
      '''
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
