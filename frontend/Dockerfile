# frontend/Dockerfile
FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve the build with a simple server
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
