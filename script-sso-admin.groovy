#!/usr/bin/env groovy

def deployImg(){
  lock('deploy_pl_fe_lock'){
            sshagent(['pl']) {
              sh """
                ssh -o StrictHostKeyChecking=no -tt ubuntu@${PL_IP} '
                  cd pl/pl-fe
                  git pull origin main
                  npm i
                  docker system prune -a -f
                  docker compose up -d --build sso-admin
                  
                '
              """
            }
  }

}
return this