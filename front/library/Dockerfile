FROM node:14.18.1-alpine

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
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000


# Start the app
CMD [ "npx", "serve", "build"]