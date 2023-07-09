FROM netdata/netdata

COPY ./nginx.conf /etc/netdata/go.d/
COPY ./fail2ban.conf /etc/netdata/python.d/

ARG SERVER_NAME

RUN  sed -i  "s#\${SERVER_NAME}#$SERVER_NAME#" /etc/netdata/go.d/nginx.conf

