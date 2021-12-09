import { Schema, model } from "mongoose";

const sensorDataSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  ph: {
    type: Number,
    required: true,
  },
});

export default model("SensorData", sensorDataSchema);
