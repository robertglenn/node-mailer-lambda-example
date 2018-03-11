# Purpose
Provide a full end-to-end example of managing the continuous delivery of a more-than-hello-world lambda function.

# How To:
### Prerequisites:
First you'll need to create some stuff on AWS: S3 Bucket (with e.g. SSE-S3 encryption), S3 Bucket Permissions, Lambda Function, Lambda Alias, API Gateway. You'll need to upload a config file to the S3 bucket with the following:
```
exports.HOST_NAME = [your domain's smtp server hostname];
exports.USER_NAME = [email address to send/receive from];
exports.PASSWORD = [password associated with USER_NAME];
```
### Update:
* build docker image, passing in AWS credentials as ARG values: `docker build -t lambda-mailer-update --build-arg AWS_ACCESS_KEY_ID=<your access key> --build-arg AWS_SECRET_ACCESS_KEY=<your secret key> --build-arg AWS_REGION=<lambda region> --build-arg CONFIG_FILE_NAME=<config file name> --build-arg PRIVATE_BUCKET_NAME=<bucket name> .`
* run docker image: `docker run -e AWS_ACCESS_KEY_ID=<your access key> -e AWS_SECRET_ACCESS_KEY=<your secret key> -e AWS_REGION=<lambda region> -e CONFIG_FILE_NAME=<config file name> -e FUNCTION_NAME=<lambda function name> -e ALIAS_NAME=<lambda alias name> lambda-mailer-update`

# Why Mail?
It's a common problem (with many solutions, for sure), which makes it a relatable concept. Seems like hiding the logic in a lambda would be a cheap/secure way to trigger a simple customizable notification email. The implementation I'm using also requires some sensitive configuration, so it's a good example of how to protect such information.

# High Level Ideas (some of which, to come)
* S3 to store config; SDK for retrieval
* SSE with S3 Key Encryption to encrypt config
* Lambda for function hosting
* Lambda alias for abstracting version
* API Gateway for remotely and securely triggering Lambda
* Lambda SDK for deployment of function code
* Docker to pull it all together: lint/test logic, securely retrieve config from S3, zip files for upload to Lambda, update alias, clean up
