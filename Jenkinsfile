pipeline {
    agent any
    
    stages {

        stage('Checkout') {
            steps {
                // Cloning the repository from GitHub
                git branch: 'user', url: 'https://github.com/saty06/BookStore.git '
            }
        }

        stage('Prepare Environment') {
            steps {
                echo 'Setting up environment variables...'
                writeFile file: '.env', text: '''
                APP_HOST = http://localhost

APP_PORT = 3000

API_VERSION = v1

DATABASE = storebook
DUSERNAME = postgres
PASSWORD = root
HOST = 127.0.0.1
PORT = 5432
DIALECT = postgres

DATABASE_TEST =  storebook                                                                              
DUSERNAME_TEST = postgres
PASSWORD_TEST = root
HOST_TEST = 127.0.0.1
PORT_TEST = 5432
DIALECT_TEST = postgres

mailUser = saty06072000student.mes.ac.in
mailPass = pwql qrfc ckgp ncbr

SEC = wedxctyhbnmkiolkmhytrfvhy6789iuyt5432werewsdftyhbvcftgnkiu90oi9876tyhf54er43w232qw3wwesddxcfcvbnnbvftyhnmjhyuiokki890987654rtyhgfre4ew323werdcghbnjhy7890okjhgt65
SESSION_SECRET=wedxctyhbnmkiolkmhytrfvhy6789iuyt5432werewsdftyhbvcftgnkiu90oi9876tyhf54er43w232qw3wwesddxcfcvbnnbvftyhnmjhyuiokki890987654rtyhgfre4ew323werdcghbnjhy7890okjhgt65
                ''' 
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'  // Use 'bat' instead of 'sh' for Windows
            }
        }

        stage('Development') {
            steps {
                echo 'Running Development...'
                bat 'npm run dev'  // Use 'bat' instead of 'sh' for Windows
            }
        }
    }
}