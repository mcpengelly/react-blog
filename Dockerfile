FROM node:boron

# Clone repo
RUN git clone https://github.com/mcpengelly/react-portfolio.git

# Change working dir
WORKDIR /react-portfolio

# Install app dependencies
RUN npm install

# Build
RUN npm run build

EXPOSE 8080

# CMD ["npm", "run", "build"]
CMD ["node", "server"]

