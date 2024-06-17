#!/bin/sh
tag=$1

set -xue

# Deploy the backend to ecr
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker build -t dena-training-2024-team-7-backend-prod -f ./docker/backend.prod.Dockerfile .
docker tag dena-training-2024-team-7-backend-prod:latest 101501319743.dkr.ecr.ap-northeast-1.amazonaws.com/dena-training-2024-team-7-backend-prod:latest
docker push 101501319743.dkr.ecr.ap-northeast-1.amazonaws.com/dena-training-2024-team-7-backend-prod:latest
aws ecs update-service --cluster dena-training-2024 --service dena-training-2024-team-7 --task-definition dena-training-2024-team-7:$tag