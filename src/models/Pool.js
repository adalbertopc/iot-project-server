import { Schema, model } from "mongoose";

const poolSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
  specs: {
    width: {
      type: Number,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  sensorDataHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SensorData",
    },
  ],
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Pool", poolSchema);
