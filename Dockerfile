# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application (TypeScript -> JavaScript)
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine

# Set the working directory in the new image
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Copy .env file if you want to include it in the container
# COPY .env ./

# Set NODE_ENV to production
ENV NODE_ENV=production


# Expose the application port (default for NestJS apps)
EXPOSE 3001

# Start the application
CMD ["node", "dist/main.js"]
