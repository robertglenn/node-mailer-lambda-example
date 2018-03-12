FROM node:8-alpine

RUN apk update && apk add zip

ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG CONFIG_FILE_NAME
ARG PRIVATE_BUCKET_NAME

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION
ENV CONFIG_FILE_NAME=$CONFIG_FILE_NAME

WORKDIR /code/

COPY . /code/

RUN npm install

## lint and test
RUN npm test

## securely grab config.js
RUN AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY AWS_REGION=$AWS_REGION CONFIG_FILE_NAME=$CONFIG_FILE_NAME PRIVATE_BUCKET_NAME=$PRIVATE_BUCKET_NAME node get-config.js

## we don't need to include the aws sdk
RUN rm -Rf node_modules && npm install --production

## zip the function code contents
RUN zip -r function.zip ./config.js ./mailer.js ./package.json ./node_modules/

## we do need the aws sdk to update lambda :/
RUN npm install

## update the lambda function code and then the lambda alias (removing the config.js and zip file, upon success)
ENTRYPOINT node deploy.js
