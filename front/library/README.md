Formic+bootstrap styles https://www.freakyjolly.com/react-forms-with-validation-example/

## Google JWT configuration 

Go to google cloud api https://console.cloud.google.com/apis/
Add your jwt token as it described in documentation https://blog.logrocket.com/guide-adding-google-login-react-app/#acquiring-google-client-id-project


## Build image
docker build --tag youknow-frontend-image .
## Run image
For localhost 
    docker run --network="host" youknow-frontend-image
For public
    docker run youknow-backend-image