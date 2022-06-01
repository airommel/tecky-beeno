set -e

sudo apt update
sudo apt install --yes docker.io
sudo apt install --yes zstd
sudo apt install --yes gzip
sudo apt install --yes docker-compose

sudo usermod -aG docker ubuntu
echo "Please login the shell again to activate new user role 'docker'..."
