# Description

![YouknoW](https://github.com/murmilad/youknow/blob/main/front/library/public/images/logo_small.svg "") Encrease your memory project

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
```

* Internal proxy redirects
Frontend web application, Backend and Netdata monitor ports.
Also point out an proxy redirect host
```conf
PROXY_REDIRECT_ADDRESS=http://<external server address>
BACKEND_PORT=<frontend port ex. 8000>
NETDATA_PORT=<netdata monitor port ex. 19999>
FRONTEND_PORT=<frontend port ex. 3001>
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

* Enable/Disable HTTPS

Put your certificates in proxy/ssl

```conf
# ssl certificate for nginx

IS_HTTPS=<set YES for enable https> 
SSL_KEY_CERTIFICATE_PATH=<certificate key name ex. localhost.key>
SSL_CRT_CERTIFICATE_PATH=<certificate name ex. localhost.crt>

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
###  For sign your own certificate

Example of generation own signed certificate as pointed in [Manual](https://dgu2000.medium.com/working-with-self-signed-certificates-in-chrome-walkthrough-edition-a238486e6858)
 
* Create certification center certificate
```bash
openssl genrsa -des3 -out web.youknow.app.key 2048
openssl req -x509 -new -nodes -key web.youknow.app.key -sha256 -days 730 -out web.youknow.app.pem
```

* Check certification center certificate

```bash
openssl x509 -in web.youknow.app.pem -text -noout
```

* Create your project certificate

```bash
openssl genrsa -out web.youknow.app.tls.key 2048
openssl req -new -key web.youknow.app.tls.key -out web.youknow.app.tls.csr
```
* Create config file web.youknow.app.cnf for signing

```conf
# Extensions to add to a certificate request
basicConstraints       = CA:FALSE
authorityKeyIdentifier = keyid:always, issuer:always
keyUsage               = nonRepudiation, digitalSignature, keyEncipherment, dataEncipherment
subjectAltName         = @alt_names
[ alt_names ]
DNS.1 = youknow.app
```

* Sign your certificate

```bash
openssl x509 -req \
    -in web.youknow.app.tls.csr \
    -CA web.youknow.app.pem \
    -CAkey web.youknow.app.key \
    -CAcreateserial \
    -out web.youknow.app.tls.crt \
    -days 730 \
    -sha256 \
    -extfile web.youknow.app.cnf
```

* Check if certificate is correct  
```bash
openssl verify -CAfile web.youknow.app.pem -verify_hostname youknow.app web.youknow.app.tls.crt
```
* Add certification center certificate (web.youknow.app.pem) to browser
* Add your project certificate (web.youknow.app.tls.crt and web.youknow.app.tls.key) to proxy/ssl

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
I had some conflicts  or something using a lot of containers, and dropping all of them was solve this.
> **Warning**
> 
> !it will removes all your Docker containers!
```shell
docker system prune -a
```
