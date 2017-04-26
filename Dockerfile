FROM node:boron

# create app dir
RUN mkdir -p /usr/src/app
WORKDIR /user/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# bundle application code
COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "run", "build"]
CMD ["node", "server"]

