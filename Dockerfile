FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN mkdir .next
RUN npm install --force
# RUN npm ci --only=production
RUN /bin/sh -c npm run build

COPY . .

EXPOSE 3000

CMD ["npm","run", "start"]