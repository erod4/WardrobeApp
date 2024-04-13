const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://erod164:2dDNOGTsyTvLOpFv@cluster0.a23uplj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("> Connected To Database");
  } catch (error) {
    console.log(error);
  }
};
connectToDB();
