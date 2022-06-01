set -e

if [ $# == 1 ]; then
  tag=$1
else
  read -p "tag: " tag
fi

docker build . -t docker-demo:$tag
