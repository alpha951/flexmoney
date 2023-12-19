# Stage 1: Build the client
FROM node:18 AS client-builder

WORKDIR /app/client

COPY client/package*.json ./

RUN npm install

COPY client .

RUN npm start

# Stage 2: Build the server
FROM node:18 AS server-builder

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install

COPY server .

# Run Sequelize migrations
RUN npm run sequelize:migrate

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
