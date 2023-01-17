FROM node:lts-alpine3.17

ENV NODE_ENV development

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification

# RUN [ "yarn", "run", "build" ]
CMD [ "yarn", "run", "start" ]