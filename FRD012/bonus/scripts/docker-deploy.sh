set -e

## Variables
server="c18demo"
server_root="~/demo"
image_name="demo-server"
image_tag="production"
image_file="image.zst"

image="$image_name:$image_tag"

## Export Docker Image
docker save "$image" \
  | pv \
  | zstd -c - \
	> "$image_file"

## Upload Docker Image and Compose File
rsync -SavLP \
  "$image_file" \
  docker-compose.yml \
  "$server:$server_root/"

## Load Docker Image on Server
ssh "$server" "cat $server_root/$image_file | unzstd -d - | docker load"

## Compose Up on Server
ssh "$server" "cd $server_root && docker-compose up -d"
