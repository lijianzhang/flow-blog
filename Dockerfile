FROM node
RUN ln -sf /usr/share/zoneinfo/Asia/ShangHai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    dpkg-reconfigure -f noninteractive tzdata
RUN mkdir /var/blog
WORKDIR /var/blog
RUN ls -l
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 3001
ENV NODE_ENV=production
CMD npm run start:pro