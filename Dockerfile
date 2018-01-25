FROM node:8.9-alpine
ENV NODE_ENV production
RUN mkdir /var/www/blog
WORKDIR /var/www/blog
COPY package.json .
RUN npm install
EXPOSE 3001
COPY . .
CMD npm start