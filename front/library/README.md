# Description

Frontend part for ![YouknoW](https://github.com/murmilad/youknow/blob/main/front/library/public/images/logo_small.png "") Project

# Configuration

Look for configuration info on the root of the project.
Environment variables is in docker-compose.yml (frontend service) 
## For separate using
### Build Docker image
docker build --tag youknow-frontend-image .
### Run Docker image
For localhost 
    docker run --network="host" youknow-frontend-image
For public
    docker run youknow-backend-image