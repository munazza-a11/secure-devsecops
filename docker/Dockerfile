# Use official secure Node.js Alpine image (Small & Secure)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (to optimize build speed)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Create a non-root user for security (Requirement)
USER node

# Start the application
CMD ["node", "src/server.js"]
