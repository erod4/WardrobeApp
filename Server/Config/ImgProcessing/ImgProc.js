const axios = require("axios");
const FormData = require("form-data");

const sendImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });
  const url = "http://127.0.0.1:5000/remove-bg";
  try {
    const res = await axios.post(url, formData, {
      headers: { ...formData.getHeaders() },
      responseType: "arraybuffer",
    });
    return res;
  } catch (error) {
    console.error("Image Processing ", error.code);
  }
};
module.exports = sendImage;
