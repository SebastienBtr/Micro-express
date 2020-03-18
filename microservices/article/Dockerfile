FROM node:13
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn global add prisma

# Create app directory
WORKDIR /app
# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install
COPY . .