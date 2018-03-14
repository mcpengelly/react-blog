FROM node:boron

# Create Dir
RUN mkdir react-portfolio

# Copy files
COPY . /react-portfolio

# Change Dir
WORKDIR /react-portfolio

# Install app dependencies
RUN npm install

# Build app
RUN npm run build

# Expose ports
EXPOSE 80
EXPOSE 443

CMD ["node", "server"]
