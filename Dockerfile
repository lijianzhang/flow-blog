FROM node
VOLUME ["/usr/share/zoneinfo/Asia/Shanghai:/etc/localtime:ro"]
RUN mkdir /var/blog
WORKDIR /var/blog
COPY package.json .
RUN npm install --registry=https://registry.npm.taobao.org
COPY . .
EXPOSE 3001
ENV NODE_ENV=production
CMD npm start