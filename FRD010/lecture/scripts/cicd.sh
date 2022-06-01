set -e

## Variables
server="c18demo"
server_root="~/demo"
image_name="demo-server"
image_tag="production"

root="$PWD"
image="$image_name:$image_tag"

## Setup
cd "$root/server"
npm i

## Test
npm test

## Build
# npm run build
docker build . -t "$image"
docker images | grep "$image_name" | grep "$image_tag"

## Deploy
cd "$root"
docker save "$image" \
  | pv \
  | zstd -c - \
	| ssh "$server" "unzstd -d - | docker load"
scp docker-compose.yml "$server:$server_root/"
ssh "$server" "cd $server_root && docker-compose up -d"
