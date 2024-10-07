import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
