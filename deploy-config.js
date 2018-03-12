
const CONFIG_FILE_NAME = process.env.CONFIG_FILE_NAME;
exports.ALIAS_NAME = process.env.ALIAS_NAME;
exports.FUNCTION_NAME = process.env.FUNCTION_NAME;
exports.ZIP_FILE_PATH = process.cwd() + '/function.zip';
exports.CONFIG_FILE_PATH = process.cwd() + '/' + CONFIG_FILE_NAME;
exports.CONFIG_FILE_NAME = CONFIG_FILE_NAME;
exports.PRIVATE_BUCKET_NAME = process.env.PRIVATE_BUCKET_NAME;
exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
exports.AWS_REGION = process.env.AWS_REGION;
