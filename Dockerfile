# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

ENV NODE_ENV staging
# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]