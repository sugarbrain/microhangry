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
heroku run -a microhangry-api npm run typeorm -- migration:run
heroku container:release web -a microhangry-api

docker tag microhangry_notification-service registry.heroku.com/microhangry-notification/web
docker push registry.heroku.com/microhangry-notification/web
heroku run -a microhangry-notification npm run typeorm -- migration:run
heroku container:release web -a microhangry-notification

docker tag microhangry_order-service registry.heroku.com/microhangry-order/web
docker push registry.heroku.com/microhangry-order/web
heroku run -a microhangry-order npm run typeorm -- migration:run
heroku container:release web -a microhangry-order

docker tag microhangry_preference-service registry.heroku.com/microhangry-preference/web
docker push registry.heroku.com/microhangry-preference/web
heroku run -a microhangry-preference npm run typeorm -- migration:run
heroku container:release web -a microhangry-preference
