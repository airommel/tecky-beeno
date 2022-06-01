set -e

## Variables
server="c18demo"
server_root="~/demo"
image_name="demo-server"
image_tag="production"

server_root="$PWD"
project_root="$server_root/.."
image="$image_name:$image_tag"

## Setup
cd "$server_root"
npm i

## Test
npm test

## Build
# npm run build
docker build . -t "$image"
docker images | grep "$image_name" | grep "$image_tag"

## Deploy
cd "$project_root"
./scripts/docker-deploy.sh
