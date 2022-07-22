FROM node:lts-slim
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --production
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]