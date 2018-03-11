// Use the S3 SDK to retrieve the config from S3

const AWS = require('aws-sdk');
const S3 = new AWS.S3();
const fs = require('fs');
const {
  CONFIG_FILE_NAME,
  PRIVATE_BUCKET_NAME
} = require('./deploy-config');

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
        console.log('Config file retrieved from S3.')
        resolve(data);
      }
    });
  });
};

const writeConfigFile = (configFile) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(CONFIG_FILE_NAME, configFile, (err, data) => {
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
