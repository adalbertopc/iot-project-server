import { Schema, model } from "mongoose";

const sensorDataSchema = new Schema({
  collectedAt: {
    type: Date,
    default: Date.now,
  },
});

export default model("SensorData", sensorDataSchema);
