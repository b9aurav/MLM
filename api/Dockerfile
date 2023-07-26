# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /api

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire API code to the container
COPY . .

# Expose the port that your API will run on
EXPOSE 3000

# Start the API
CMD ["node", "server.js"]
