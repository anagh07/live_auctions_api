const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const Bucket = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// Upload file to S3 bucket
exports.uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket,
    Body: fileStream,
    Key: file.filename,
  };

  // return promise returned by s3
  return s3.upload(uploadParams).promise();
};

// Get file from S3 bucket
exports.getFileStream = async (fileKey) => {
  const downloadParams = {
    Bucket,
    Key: fileKey,
  };
  const file = await s3.getObject(downloadParams).promise();
  return file.Body;
};
