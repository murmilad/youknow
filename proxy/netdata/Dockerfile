FROM netdata/netdata

COPY ./nginx.conf /etc/netdata/go.d/
COPY ./fail2ban.conf /etc/netdata/python.d/

ARG PROXY_REDIRECT_ADDRESS

RUN  sed -i  "s#\${PROXY_REDIRECT_ADDRESS}#$PROXY_REDIRECT_ADDRESS#" /etc/netdata/go.d/nginx.conf

