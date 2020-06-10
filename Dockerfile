FROM node:12 as web

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/web
WORKDIR /usr/src/web

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying source files
COPY . .

# Building the app
RUN npm run build
EXPOSE 3000
