export $(cat .env | sed 's/#.*//g' | xargs)
docker-compose up
