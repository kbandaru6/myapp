pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Debug Workspace') {
      steps {
        sh '''
          echo "=== ROOT ==="
          pwd
          ls -la

          echo "=== FRONTEND ==="
          ls -la frontend || true
        '''
      }
    }

    stage('Build Frontend') {
      steps {
        dir('frontend') {
          sh '''
            echo "PWD inside frontend:"
            pwd
            ls -la

            echo "Running node container test:"
            docker run --rm \
              -v "$PWD:/app" \
              -w /app \
              node:18 \
              ls -la /app

            docker run --rm \
              -v "$PWD:/app" \
              -w /app \
              node:18 \
              cat /app/package.json

            docker run --rm \
              -v "$PWD:/app" \
              -w /app \
              node:18 \
              npm install
          '''
        }
      }
    }
  }
}
