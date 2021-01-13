FROM node:12.18-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 8888
CMD ["npm", "start"]