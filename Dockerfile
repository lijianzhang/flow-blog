FROM node:8.9-alpine
ENV NODE_ENV production
VOLUME [ ".:/usr/src/blog" ]
WORKDIR /usr/src/blog
RUN npm install
EXPOSE 3001
CMD npm start