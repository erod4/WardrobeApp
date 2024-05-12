const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const short = require("short-uuid");
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
  const unique_id = short.generate();
  const key = userId + unique_id + ".png";

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key, // File name you want to save as in S3
    Body: buffer.data,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    const url = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${key}`;
    return { data, url };
  } catch (error) {
    console.error(error);
    return error;
  }
};
const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: key.split("/")[3],
  };
  try {
    const data = await s3Client.send(new DeleteObjectCommand(params));
    console.table(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
module.exports = { uploadToS3, deleteFromS3 };
