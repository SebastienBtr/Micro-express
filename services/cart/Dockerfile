FROM node:13
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn global add prisma

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .