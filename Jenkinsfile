pipeline {
  agent any
  environment {
        DOCKER_IMAGE = "carbonx_fe:$BUILD_NUMBER"
        DOCKER_REGISTRY = "scaiweuacrdev"
        dockerImage = ''
        registryUrl = "scaiweuacrdev.azurecr.io"
        REG_CRED = credentials('ACR')
        carbonx_webhook_url = credentials('carbonx_webhook_url')
        urlPar = JOB_NAME.split('/', 2)
        buildURL = "$BUILD_URL"
        newBuildURL = buildURL.replace("job/${urlPar[0]}", "blue/organizations/jenkins/${urlPar[0]}")
    }
  stages {
    stage('Deployment On Dev server') {
      when {
        anyOf { branch "${env.Carbonx_fe_branch}" }
      }
      stages {
                stage('Build and Push Docker Image') {
                    steps {
                        BuidAndPublish()
                    }
                }
                
                stage('Deploying service') {
                    steps {
                        DeployAksCluster('carbonx-fe','carbonx-fe','carbonx-dev')
                    }
                }
      }
      post {
        success {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            newBuildURL = newBuildURL.replace("job", "detail")
            newBuildURL = newBuildURL.replace("%252F","%2F")
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#00FF00',
          message: 'Application has been deployed',
          status: 'Success',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "Dev Enviroment"],
                            [name: "Jenkins Pipeline URL", template: "[JENKINS]($newBuildURL)"]]
        }
        failure {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#FF0000',
          message: 'Build has been failed check logs in jenkins',
          status: 'Failed',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "Dev Enviroment"]]
        }
      }  
    }
    stage('Deployment On Staging server') {
      when {
        anyOf { branch "${env.Carbonx_fe_staging_branch}" }
      }
      stages {      
        
                stage('Build and Push Docker Image') {
                    steps {
                        BuidAndPublish()
                    }
                }
                
                stage('Deploying service') {
                    steps {
                        DeployAksCluster('carbonx-fe','carbonx-fe','carbonx-staging')
                    }
                }
        
      }
      post {
        success {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            newBuildURL = newBuildURL.replace("job", "detail")
            newBuildURL = newBuildURL.replace("%252F","%2F")
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#00FF00',
          message: 'Application has been deployed',
          status: 'Success',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "staging Enviroment"],
                            [name: "Jenkins Pipeline URL", template: "[JENKINS]($newBuildURL)"]]
        }
        failure {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#FF0000',
          message: 'Build has been failed check logs in jenkins',
          status: 'Failed',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "staging Enviroment"]]
        }
      }  
    }
    stage('Deployment On Hitachi Dev server') {
      when {
        anyOf { branch "${env.hitachi_Carbonx_fe_dev_branch}" }
      }
      stages {
                stage('Build and Push Docker Image') {
                    steps {
                        BuidAndPublish()
                    }
                }
                
                stage('Deploying service') {
                    steps {
                        DeployAksCluster('hitachi-fe','hitachi-fe','hitachi-dev')
                    }
                }
      }
      post {
        success {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            newBuildURL = newBuildURL.replace("job", "detail")
            newBuildURL = newBuildURL.replace("%252F","%2F")
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#00FF00',
          message: 'Application has been deployed',
          status: 'Success',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "Dev Enviroment"],
                            [name: "Jenkins Pipeline URL", template: "[JENKINS]($newBuildURL)"]]
        }
        failure {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#FF0000',
          message: 'Build has been failed check logs in jenkins',
          status: 'Failed',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "Dev Enviroment"]]
        }
      }  
    }
    stage('Deployment On Hitachi Staging server') {
      when {
        anyOf { branch "${env.hitachi_Carbonx_fe_staging_branch}" }
      }
      stages {      
        
                stage('Build and Push Docker Image') {
                    steps {
                        BuidAndPublish()
                    }
                }
                
                stage('Deploying service') {
                    steps {
                        DeployAksCluster('hitachi-fe','hitachi-fe','hitachi-staging')
                    }
                }
        
      }
      post {
        success {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
            newBuildURL = newBuildURL.replace("job", "detail")
            newBuildURL = newBuildURL.replace("%252F","%2F")
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#00FF00',
          message: 'Application has been deployed',
          status: 'Success',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "staging Enviroment"],
                            [name: "Jenkins Pipeline URL", template: "[JENKINS]($newBuildURL)"]]
        }
        failure {
          script{
            sh 'git log -1 --oneline > git-message'
            env.gitMessage = sh( script: "cat git-message", returnStdout: true).trim()
            env.authorName = sh(script: "git show -s --pretty=%an", returnStdout: true).trim()
            env.authorID = sh(script: "git show -s --pretty=%ae", returnStdout: true).trim()
          }
          office365ConnectorSend webhookUrl: "${carbonx_webhook_url}",
          color: '#FF0000',
          message: 'Build has been failed check logs in jenkins',
          status: 'Failed',
          factDefinitions: [[name: "Commit", template: "${env.gitMessage}"],
                            [name: "Commit Author Details", template: "Github ID: ${env.authorName}, Github EmailId: ${env.authorID}"],
                            [name: "Enviroment", template: "staging Enviroment"]]
        }
      }  
    }
  }
  post {
        always {
            cleanWs()
            sh 'ls'
            sh """echo "Cleaned Up Workspace For Project"  """
        }
  }
}

def BuidAndPublish () {
    script {
        dockerImage = docker.build( "$DOCKER_REGISTRY/$GIT_BRANCH/$DOCKER_IMAGE", "-f Dockerfile .")
        docker.withRegistry( "http://${registryUrl}", 'ACR' ) {
            dockerImage.push()
        }
    }
}

def DeployAksCluster (DEPLOYMENTNAME, CONTAINERNAME, NAMESPACE) {
    script {
        docker.withRegistry( "http://${registryUrl}", 'ACR' ) {
            withCredentials([string(credentialsId: 'AKS_APPLICATION_ID', variable: 'AKS_APPLICATION_ID'),string(credentialsId: 'AKS_APPLICATION_SECERT', variable: 'AKS_APPLICATION_SECERT'),string(credentialsId: 'AKS_CLUSTER_SUB', variable: 'AKS_CLUSTER_SUB'),string(credentialsId: 'AKS_RESOURCE_GROUP', variable: 'AKS_RESOURCE_GROUP'),string(credentialsId: 'AKS_CLUSTER_NAME', variable: 'AKS_CLUSTER_NAME'),string(credentialsId: 'AZURE_TENANT_ID', variable: 'AZURE_TENANT_ID')]) { 
            sh "docker run -d --name aks_carfe -e AKS_APPLICATION_ID='${AKS_APPLICATION_ID}' -e AKS_APPLICATION_SECERT='${AKS_APPLICATION_SECERT}' -e AKS_CLUSTER_SUB='${AKS_CLUSTER_SUB}' -e AKS_RESOURCE_GROUP='${AKS_RESOURCE_GROUP}' -e AKS_CLUSTER_NAME='${AKS_CLUSTER_NAME}' -e AZURE_TENANT_ID='${AZURE_TENANT_ID}' '${AKS_CLI_IMAGE}'"
            sh "sleep 30"
            sh "./aks_deployment/deploy_script.sh ${DEPLOYMENTNAME} ${CONTAINERNAME} ${NAMESPACE}"
            }
        }
    }
}
