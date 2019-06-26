#!/bin/bash

declare -a names=("core" 
                  "order" 
                  "notification"
		  "preference")

for name in "${names[@]}"
do
   sudo docker exec -it $name npm run typeorm -- migration:run
done
