export $(cat .env | sed 's/#.*//g' | xargs)
sudo docker-compose up
