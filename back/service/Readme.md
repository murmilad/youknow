# Docker
## Build image
docker build --tag youknow-backend-image .
## Run image
For localhost 
    docker run --network="host" youknow-backend-image
For public
    docker run youknow-backend-image