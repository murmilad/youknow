FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf.template
COPY ./start_nginx.sh /bin

EXPOSE ${SERVER_PORT}
