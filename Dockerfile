FROM node:16.15-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]