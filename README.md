# Description

![YouknoW](https://github.com/murmilad/youknow/blob/main/front/library/public/images/logo_small.svg "") Project
Encrease your memory project

## Forget curve


### Two days learning
* First repeat — after first exercize;
* Second repeat — 20 minutes after first exercize;
* Trird repeat — till 8 hours after second exercize;
* Forth repeat — till 24 hours after third.
### Lond time memorization
* First repeat — after first exercize;
* Second repeat — 20-30 minutes after first exercize;
* Trird repeat — till Day  after second exercize;
* Forth repeat — till 2-3 Weeks after third.
* Fifth repeat — till 2-3 Months after forth.
### Alternative  memorization (Sullivan, Tompson method)
* First repeat — after first exercize;
* Second repeat — 25 seconds after first exercize;
* Trird repeat — 2 min after second exercize;
* Forth repeat — 10 min after third.
* Fifth repeat — An hour after forth.
* Sixth repeat — 5 hour till fifth.
* Seventh repeat — A day till sixth.
* Eighth repeat — 5 day till seventh.
* Nineth repeat — 25 day till eighth.
* Tenth repeat — 4 month till nineth.
* Eleventh repeat — 2 year till tenth.
* etc.

All this methods correspond to [forgetting curve](https://en.wikipedia.org/wiki/Forgetting_curve)

# Configuration

## GIT
Clone YouknoW
```shell
    git clone https://github.com/murmilad/youknow.git
```
## Environment variables
* Copy .app.expample file in project root directory
```shell
    cd ./youknow
    cp .env.examples ./env
```


Add project configuration

* Server external proxy configuration

```conf
# Proxy server
SERVER_NAME=<external server name>
SERVER_PORT=80

PROXY_REDIRECT_ADDRESS=http://<external server address>
```

* Database confuguration

```conf
# Database
POSTGRES_HOST=<database server ip address>
POSTGRES_PORT=5560
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<database password>
POSTGRES_DB=youknow
```

* Email sending configuration

```conf
# Email sending
EMAIL_FROM=<sender e-mail address>
SMTP_HOST=<SMTP server host>
SMTP_USER=<SMTP server user>
SMTP_PASS=<SMTP server password>
SMTP_PORT=<SMTP server port>
```

* Backend connections configuration

```conf
# Backend
BACKEND_PORT=8000
EXTERNAL_BACKEND_ADDRESS=http://<external server address>
EXTERNAL_BACKEND_PORT=80
CLIENT_ORIGIN=http://<external server address>
```


* JWT token configuration
```conf
TOKEN_EXPIRED_IN=<token expire time ex. 60m>
TOKEN_MAXAGE=<token max age ex. 60>
TOKEN_SECRET=<token encode word ex. Any word>
```


* Google OAuth configuration

Go to google cloud create your own token, and permit your application address [api](https://console.cloud.google.com/apis/)
Add your jwt token as it described in [documentation](https://blog.logrocket.com/guide-adding-google-login-react-app/#acquiring-google-client-id-project)

```conf
GOOGLE_OAUTH_CLIENT_ID=<Google O-Auth client ID>
GOOGLE_OAUTH_CLIENT_SECRET=<Google O-Auth client Secret>
GOOGLE_OAUTH_REDIRECT_URL=http://<external server name:port ex. localhost:8000>/api/sessions/oauth/google
```

* GitHub OAuth configuration

Register your OAuth application correspond to [GitHub documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow)

```conf
    GITHUB_OAUTH_CLIENT_ID=<GitHub O-Auth client ID>
    GITHUB_OAUTH_CLIENT_SECRET=<GitHub O-Auth client secret>
    GITHUB_OAUTH_REDIRECT_URL=http://<backend server address:port ex. localhost:8000>/api/sessions/oauth/github
```
* Frontend web application configuration
```conf
    FRONTEND_PORT=<frontend port>
```

## Deploying application
* enable and start ipconfig for fail2ban
```shell
sudo systemctl enable ipconfig
sudo systemctl start ipconfig
```
* Build containers
```shell
docker-compose build
```
* Up containers
```shell
docker-compose up -p
```

# Trouble shooting
## fail2ban
### iptables 'No chain/target/match by that name.' error
Errors on Bun IPs in ./proxy/log/fail2ban/fail2ban.log
```log
2023-07-07 04:41:15,742 7F4E11DD0B38 ERROR 7f4e12a19d70 -- exec: iptables -w -F f2b-nginx-bad-request
2023-07-07 04:41:15,742 7F4E11DD0B38 ERROR 7f4e12a19d70 -- stderr: 'iptables: No chain/target/match by that name.'
2023-07-07 04:41:15,742 7F4E11DD0B38 ERROR 7f4e12a19d70 -- returned 1
```
Try load multiport for fail2ban
```shell
modprobe -v xt_multiport
sudo systemctl start ipconfig
sudo systemctl restart docker
```
### No errors in log, but IPs is not blocked
You can remove all docker containers
:warning: **it will removes all your Docker containers!**
```shell
docker system prune -a
```
