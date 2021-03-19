FROM node:15-slim

# Change working directory
WORKDIR /app/

# Copy package.json and package-lock.json
COPY backend/package*.json ./backend/

WORKDIR /app/backend

# Install npm production packages
RUN npm install --save-dev

COPY ./backend /app/backend

ENV NODE_ENV development
ENV PORT 3000
ENV MONGODB_URI mongodb://db:27017/note-dev

EXPOSE 3000

CMD ["node", "src/server.js"]