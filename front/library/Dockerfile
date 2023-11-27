FROM node:14.18.1-alpine as builder

# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .

ARG EXTERNAL_BACKEND_ADDRESS
ENV REACT_APP_BACKEND_ADDRESS=$EXTERNAL_BACKEND_ADDRESS
ARG EXTERNAL_BACKEND_PORT
ENV REACT_APP_BACKEND_PORT=$EXTERNAL_BACKEND_PORT
ARG GOOGLE_OAUTH_CLIENT_ID
ENV REACT_APP_GOOGLE_OAUTH_CLIENT_ID=$GOOGLE_OAUTH_CLIENT_ID
ARG GOOGLE_OAUTH_REDIRECT_URL
ENV REACT_APP_GOOGLE_OAUTH_REDIRECT=$GOOGLE_OAUTH_REDIRECT_URL
ARG GITHUB_OAUTH_CLIENT_ID
ENV REACT_APP_GITHUB_OAUTH_CLIENT_ID=$GITHUB_OAUTH_CLIENT_ID
ARG GITHUB_OAUTH_REDIRECT_URL
ENV REACT_APP_GITHUB_OAUTH_REDIRECT=$GITHUB_OAUTH_REDIRECT_URL

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 


# Build the app
RUN npm run build
# ==== RUN =======
# production environment
FROM nginx:1.15.10-alpine

COPY --from=builder /app/build /var/www
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
CMD ["nginx", "-g", "daemon off;"]