FROM node:16.14.0-stretch-slim

# this will be run during the build process
RUN node -v

## install our server
WORKDIR /srv/app

# copy one file
# COPY ./server.js /srv/app/server.js

RUN npm init --yes
# RUN npm install --save ...
RUN npm install --save dotenv@^16.0.0
RUN npm install --save express@^4.17.3
RUN npm install --save pg@^8.7.3
RUN npm install --save-dev @types/express@^4.17.13
RUN npm install --save-dev @types/pg@^8.6.4
RUN npm install --save-dev gen-dockerfile-install@^1.1.0
RUN npm install --save-dev ts-node@^10.5.0
RUN npm install --save-dev typescript@^4.5.5
RUN npm install --save aws-sdk@^2.1079.0
RUN npm install --save knex@^1.0.3
RUN npm install --save multer@^1.4.4
RUN npm install --save multer-s3@^2.10.0
RUN npm install --save-dev @types/multer@^1.4.7
RUN npm install --save-dev @types/multer-s3@^2.7.11
RUN npm install --save-dev ts-node-dev@^1.1.8
RUN npm install --save @types/cors@^2.8.12
RUN npm install --save cors@^2.8.5
RUN npm install --save-dev quick-erd@^1.3.1
COPY package.json .
RUN npm install

# copy everything (except listed in .dockerignore)
COPY . . 

# build ts projectin to js, reducing memory requirement on the server
RUN npm run build

# remove devDependecies to make image slim
RUN npm i --prod

RUN cp package.json dist/

# this will be run when we start a container from the built image
WORKDIR /srv/app/dist
CMD npx knex migrate:latest && node server.js

# EXPOSE 8100 # let it controlled by environment variable in docker-compose instead
