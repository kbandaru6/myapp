# -------- Build stage --------
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build React app
RUN npm run build


# -------- Run stage --------
FROM nginx:alpine

# Copy build output to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
