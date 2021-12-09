import { Schema, model } from "mongoose";
import SensorData from "./SensorData";

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
  volumen: {
    type: Number,
    required: true,
  },
  sensorID: {
    type: String,
    required: true,
  },
  sensorDataHistory: {
    type: [SensorData.schema],
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("Pool", poolSchema);
