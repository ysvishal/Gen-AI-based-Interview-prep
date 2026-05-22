pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('DOCKER_ID')
        SONAR_AUTH_TOKEN = credentials('sonar-token')
        BACKEND_IMAGE = "vishal952005/genai-fullstack-backend:latest"
        FRONTEND_IMAGE = "vishal952005/genai-fullstack-frontend:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/ysvishal/gen-ai-based-interview-prep.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('Backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('Frontend/resume-builder') {
                    bat 'npm install'
                }
            }
        }

        stage('OWASP Dependency Check') {
    steps {
        dependencyCheck additionalArguments: '--scan ./Backend --format XML',
        odcInstallation: 'OWASP-DC'

        dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
    }
}
        stage('SonarQube Analysis') {
    steps {
        script {
            def scannerHome = tool 'sonar-scanner'
            withSonarQubeEnv('sonarqube') {
                dir('Backend') {
                    bat """
                    ${scannerHome}\\bin\\sonar-scanner.bat ^
                    -Dsonar.projectKey=genai-backend ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.login=%SONAR_AUTH_TOKEN%
                    """
                }
            }
        }
    }
}
        stage('Build Backend Docker Image') {
            steps {
                dir('Backend') {
                    bat 'docker build -t %BACKEND_IMAGE% .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('Frontend/resume-builder') {
                    bat 'docker build -t %FRONTEND_IMAGE% .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                bat 'docker login -u %DOCKERHUB_CREDENTIALS_USR% -p %DOCKERHUB_CREDENTIALS_PSW%'
            }
        }

        stage('Push Backend Image') {
            steps {
                bat 'docker push %BACKEND_IMAGE%'
            }
        }

        stage('Push Frontend Image') {
            steps {
                bat 'docker push %FRONTEND_IMAGE%'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}