if [ $IS_HTTPS == 'YES' ]; then 
    envsubst '${SERVER_PORT}${FRONTEND_PORT}${BACKEND_PORT}${SERVER_NAME}${PROXY_REDIRECT_ADDRESS}${NETDATA_PORT}${SSL_KEY_CERTIFICATE_PATH}${SSL_CRT_CERTIFICATE_PATH}' < /etc/nginx/conf.d/nginx.conf.ssl.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;';
else
    envsubst '${SERVER_PORT}${FRONTEND_PORT}${BACKEND_PORT}${SERVER_NAME}${PROXY_REDIRECT_ADDRESS}${NETDATA_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
fi