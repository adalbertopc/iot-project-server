import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  pools: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pool",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("User", userSchema);
