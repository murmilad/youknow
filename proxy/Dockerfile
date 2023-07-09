FROM nginx:latest

COPY ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY ./nginx.conf.ssl.template /etc/nginx/conf.d/nginx.conf.ssl.template
COPY ./start_nginx.sh /bin

EXPOSE ${SERVER_PORT}
