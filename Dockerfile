FROM node:15-slim

# Change working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm production packages 
RUN npm install --save-dev

COPY . /app

ENV NODE_ENV development
ENV PORT 3000
ENV MONGODB_URI mongodb://db:27017/note-dev

WORKDIR "/app/src"
EXPOSE 3000

CMD ["node", "server.js"]