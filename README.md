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

## Backend configuration

### set ./back/service/app.env parameters

Database confuguration

```conf
    POSTGRES_HOST=<database host>
    POSTGRES_PORT=<database port>
    POSTGRES_USER=<database user>
    POSTGRES_PASSWORD=<database password>
    POSTGRES_DB=youknow
```

Backend connections configuration
```conf
    PORT=<backend port>
    CLIENT_ORIGIN=<frontend address form CORS checking ex. http://localhost:3001>
```

E-Mail sending configuration
```conf
    EMAIL_FROM=<sender e-mail address>
    SMTP_HOST=<SMTP server host>
    SMTP_USER=<SMTP server user>
    SMTP_PASS=<SMTP server password>
    SMTP_PORT=<SMTP server port>
```

JWT token configuration
```conf
    TOKEN_EXPIRED_IN=<token expire time ex. 60m>
    TOKEN_MAXAGE=<token max age ex. 60>
    TOKEN_SECRET=<token encode word ex. Any word>
```


Google OAuth configuration

Go to google cloud create your own token, and permit your application address [api](https://console.cloud.google.com/apis/)
Add your jwt token as it described in [documentation](https://blog.logrocket.com/guide-adding-google-login-react-app/#acquiring-google-client-id-project)

```conf
    GOOGLE_OAUTH_CLIENT_ID=<Google O-Auth client ID>
    GOOGLE_OAUTH_CLIENT_SECRET=<Google O-Auth client Secret>
    GOOGLE_OAUTH_REDIRECT_URL=http://<backend server address:port ex. localhost:8000>/api/sessions/oauth/google
```

GitHub OAuth configuration
Register your OAuth application correspond to [GitHub documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow)

```conf
    GITHUB_OAUTH_CLIENT_ID=<GitHub O-Auth client ID>
    GITHUB_OAUTH_CLIENT_SECRET=<GitHub O-Auth client secret>
    GITHUB_OAUTH_REDIRECT_URL=http://<backend server address:port ex. localhost:8000>/api/sessions/oauth/github
```
## Web frontend configuration

### set ./front/library/.env parameters

React application configuration
```conf
REACT_APP_BACKEND_ADDRESS=<Frontend application address ex. http://localhost>
REACT_APP_BACKEND_PORT=<Frontend application port ex. 8000>
```

```conf
REACT_APP_GOOGLE_OAUTH_CLIENT_ID=<Google O-Auth client ID>
REACT_APP_GOOGLE_OAUTH_REDIRECT=http://<backend server address:port ex. localhost:8000>/api/sessions/oauth/google
```

```conf
REACT_APP_GITHUB_OAUTH_CLIENT_ID=<GitHub O-Auth client ID>
REACT_APP_GITHUB_OAUTH_REDIRECT=http://<backend server address:port ex. localhost:8000>/api/sessions/oauth/github
```

# Deploying application