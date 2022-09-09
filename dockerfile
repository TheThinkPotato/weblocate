# FROM node:erbium-alpine
FROM ubuntu

# Install dependencies
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

#Add Client
# ADD client client
COPY client client

#Add Server
# ADD server server
COPY server server

#Install client dependencies and build
WORKDIR /client
RUN ls
RUN npm install
RUN npm run build

#Install server dependencies
WORKDIR /server
RUN ls
RUN npm install


# Expose app port to the outside
EXPOSE 3000

# Start the app
# CMD ["node","app.js"]
CMD ["ls"]
