# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

RUN npm config set legacy-peer-deps true

RUN npm install -g @angular/cli

# Install the dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Angular project
RUN npm run build

# Expose the port that your Angular application will run on
EXPOSE 4200

# Start the Angular application
CMD ["ng", "serve"]
