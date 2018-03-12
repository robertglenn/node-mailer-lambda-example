// Use the S3 SDK to retrieve the config from S3

const AWS = require('aws-sdk');
const fs = require('fs');
const {
  CONFIG_FILE_NAME,
  PRIVATE_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION
} = require('./deploy-config');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});
const S3 = new AWS.S3();

const getConfigParams = {
  Bucket: PRIVATE_BUCKET_NAME,
  Key: CONFIG_FILE_NAME
};

const getConfig = () => {
  return new Promise((resolve, reject) => {
    S3.getObject(getConfigParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log('Config file retrieved from S3.');
        resolve(data.Body);
      }
    });
  });
};

const writeConfigFile = (configFileBuffer) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(CONFIG_FILE_NAME, configFileBuffer, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log('Config file saved, locally.');
      }
    });
  });
}

getConfig().then(writeConfigFile);
