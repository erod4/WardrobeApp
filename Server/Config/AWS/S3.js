const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

// Create an S3 client
const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// List S3 buckets
const testS3 = async () => {
  try {
    const data = await s3Client.send(new ListBucketsCommand({}));
    console.log("> S3 Client Active");
  } catch (err) {
    console.error("! Error", err);
  }
};

testS3();

const uploadToS3 = async (file, buffer, userId) => {
  console.log(buffer.data);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: userId + file.originalname, // File name you want to save as in S3
    Body: buffer.data,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
module.exports = uploadToS3;
