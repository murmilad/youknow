# Description

Frontend part for ![YouknoW](https://github.com/murmilad/youknow/blob/main/front/library/public/images/logo_small.png "") Project

# Configuration

## Google JWT configuration 

Go to google cloud create your own token, and permit your application address [api](https://console.cloud.google.com/apis/)
Add your jwt token as it described in [documentation](https://blog.logrocket.com/guide-adding-google-login-react-app/#acquiring-google-client-id-project)


## Build Docker image
docker build --tag youknow-frontend-image .
## Run Docker image
For localhost 
    docker run --network="host" youknow-frontend-image
For public
    docker run youknow-backend-image