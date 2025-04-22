FROM node:18-alpine AS build

WORKDIR /src

# Copy package.json and package-lock.json/yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build 

# Install 'serve' to serve the build folder
RUN npm install -g serve

# Expose the port that 'serve' will use
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]