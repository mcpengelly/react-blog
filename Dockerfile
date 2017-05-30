FROM node:boron

# copy files
COPY build/ /react-portfolio
COPY src/ /react-portfolio
COPY server/ /react-portfolio
COPY public/ /react-portfolio
COPY package.json /react-portfolio

# Change working dir
WORKDIR /react-portfolio

# Install app dependencies
RUN npm install

# Build
RUN npm run build

EXPOSE 8080

CMD ["node", "server"]

