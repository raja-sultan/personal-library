#!/usr/bin/env groovy
def gv
properties([
    parameters([
        choice(
            name: 'MICROSERVICE',
            choices: ['SSO-Admin', 'Performance', 'Recruiting', 'OnBoarding'],
            description: '***Choose the microservice which you want to Deploy***'
        )
    ])
])

pipeline{
    agent any
    environment{
        VERSION="1.1.1"
        PL_IP="192.168.100.123"

    }
    stages{
        stage('Initialization'){
            steps{
                script{
                    switch(params.MICROSERVICE){
                        case 'SSO-Admin':
                            gv=load 'script-sso-admin.groovy'
                            break
                        case 'Performance':
                            gv=load 'script-performance.groovy'
                            break
                        case 'Recruiting':
                            gv=load 'script-recruiting.groovy'
                            break
                        case 'OnBoarding':
                            gv=load 'script-onboarding.groovy'
                            break
                        default:
                           error "Invalid Microservice Choice!"
                    }
                }
            }
        }
        stage('Deploying Image'){
            steps{
                script{
                    gv.deployImg()
                }
            }
        }
    }
}