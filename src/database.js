import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/iot-project", {
      useNewUrlParser: true,
    });
    console.log("Conectado a la base de datos");
  } catch (e) {
    console.log("Error al conectar a la base de datos");
    console.log(e);
  }
};
