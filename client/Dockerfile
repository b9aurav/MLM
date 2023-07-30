# Use the official Nginx image as the base image
FROM nginx:latest

# Copy the built Angular files to the Nginx default public directory
COPY ./dist /usr/share/nginx/html

# Expose the port that Nginx will listen on (usually 80 by default)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
