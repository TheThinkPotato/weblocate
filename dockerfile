FROM ubuntu

# Set basic AWS credentials and API Key variables
ENV AWS_ACCESS_KEY_ID xx
ENV AWS_SECRET_ACCESS_KEY xx
ENV AWS_SESSION_TOKEN xx

# Set External API Keys
ENV API_NINJAS_KEY xx
ENV API_IPINFO_KEY xx
ENV API_EXERRA_KEY xx
ENV API_ORBINTEL_KEY xx
ENV API_TIMEZONE_KEY xx

# Install dependencies
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

#Add Client
COPY client client

#Add Server
COPY server server

#Install client dependencies and build
WORKDIR /client
RUN npm install
RUN npm run build

#Install server dependencies
WORKDIR /server
RUN npm install

# Expose app port to the outside
EXPOSE 3000

# Start the app
CMD ["node","app.js"]

