FROM netdata/netdata

COPY ./nginx.conf /etc/netdata/go.d/
COPY ./fail2ban.conf /etc/netdata/python.d/
COPY ./netdata.conf /etc/netdata/

ARG PROXY_REDIRECT_ADDRESS
ARG SERVER_STATS_PORT

RUN  sed -i  "s#\${PROXY_REDIRECT_ADDRESS}#$PROXY_REDIRECT_ADDRESS#" /etc/netdata/go.d/nginx.conf
RUN  sed -i  "s#\${SERVER_STATS_PORT}#$SERVER_STATS_PORT#" /etc/netdata/go.d/nginx.conf

