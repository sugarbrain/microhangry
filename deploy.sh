cat >~/.netrc <<EOF
machine api.heroku.com
    login $HEROKU_EMAIL
    password $HEROKU_TOKEN
machine git.heroku.com
    login $HEROKU_EMAIL
    password $HEROKU_TOKEN
EOF

docker login -u _ -p "$HEROKU_TOKEN"  registry.heroku.com

docker tag microhangry_core-api registry.heroku.com/microhangry-api/web
docker push registry.heroku.com/microhangry-api/web
docker run registry.heroku.com/microhangry-api/web npm run typeorm -- migration:run
heroku container:release web -a microhangry-api

docker tag microhangry_notification-service registry.heroku.com/microhangry-notification/web
docker push registry.heroku.com/microhangry-notification/web
docker run registry.heroku.com/microhangry-notification/web npm run typeorm -- migration:run
heroku container:release web -a microhangry-notification

docker tag microhangry_order-service registry.heroku.com/microhangry-order/web
docker push registry.heroku.com/microhangry-order/web
docker run registry.heroku.com/microhangry-order/web npm run typeorm -- migration:run
heroku container:release web -a microhangry-order

docker tag microhangry_preference-service registry.heroku.com/microhangry-preference/web
docker push registry.heroku.com/microhangry-preference/web
docker run registry.heroku.com/microhangry-preference/web npm run typeorm -- migration:run
heroku container:release web -a microhangry-preference
