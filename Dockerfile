# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port your server uses
EXPOSE 1820

# Start the server
CMD ["node", "server.js"]
