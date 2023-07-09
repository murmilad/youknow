FROM netdata/netdata

COPY ./nginx.conf /etc/netdata/go.d/
COPY ./fail2ban.conf /etc/netdata/python.d/

ARG EXTERNAL_BACKEND_ADDRESS

RUN  sed -i  "s#\${EXTERNAL_BACKEND_ADDRESS}#$EXTERNAL_BACKEND_ADDRESS#" /etc/netdata/go.d/nginx.conf

