FROM node:8.9-alpine
ENV NODE_ENV production
VOLUME [ "..:/usr/src/blog" ]
WORKDIR /usr/src/blog/frontend
COPY ["package.json", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3001
CMD npm start