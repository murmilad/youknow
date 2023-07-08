# Description
Backend part for ![YouknoW](https://github.com/murmilad/youknow/blob/main/front/library/public/images/logo_small.png "") Project

# Configuration

Look for configuration info on the root of the project.
Environment variables is in docker-compose.yml (backend service)
## Build image
docker build --tag youknow-backend-image .
## Run image
For localhost 
    docker run --network="host" youknow-backend-image
For public
    docker run youknow-backend-image