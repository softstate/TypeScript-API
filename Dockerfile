#Dockerfile
FROM node:12-slim

# create a worker folder
WORKDIR /usr/src/backend

# install app dependencies
COPY package*.json ./

# building clean install code for production
RUN npm ci

# Bundle app source
COPY . .

# inject entrypoint script to docker location
RUN cp docker-entrypoint.sh /usr/local/bin/ && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

# start the app with secure shell cmd
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]