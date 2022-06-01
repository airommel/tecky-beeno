set -e

./scripts/docker-build.sh dev

docker stop docker-demo-server || true
docker rm docker-demo-server || true

docker run --name docker-demo-server -p 8100:8100 docker-demo:dev
