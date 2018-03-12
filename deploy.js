// Use the Lambda SDK to upload the zip to Lambda, then update alias

const AWS = require('aws-sdk');
const Lambda = new AWS.Lambda();
const {
  ALIAS_NAME,
  FUNCTION_NAME,
  ZIP_FILE_PATH,
  CONFIG_FILE_PATH
} = require('./deploy-config');
const fs = require('fs');

const updateFunctionParams = {
  FunctionName: FUNCTION_NAME,
  Publish: true
};

const updateAliasParams = {
  FunctionName: FUNCTION_NAME,
  Name: ALIAS_NAME
};

const updateZipFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(ZIP_FILE_PATH, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log('Zip file has been added to the update function config');
        updateFunctionParams.ZipFile = data;
        resolve();
      }
    });
  });
};

const updateFunctionCode = () => {
  return new Promise((resolve, reject) => {
    Lambda.updateFunctionCode(updateFunctionParams, (err, data) => {
      if (err || data.Version === '') {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log('Function Code has been updated');
        updateAliasParams.FunctionVersion = data.Version;
        resolve();
      }
    });
  });
};

const updateAlias = () => {
  return new Promise((resolve, reject) => {
    Lambda.updateAlias(updateAliasParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        reject(err);
      } else {
        console.log('Alias has been updated');
        resolve();
      }
    });
  });
};

updateZipFile().then(updateFunctionCode).then(updateAlias);
