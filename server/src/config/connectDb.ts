import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONO_URI}`);
    console.log("db connection is successfull");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
