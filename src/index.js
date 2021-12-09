import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { Server } from "socket.io";
import { connect } from "./database";
import User from "./models/User";
import nodemailer from "nodemailer";
import Pool from "./models/Pool";
import cors from "cors";

require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
connect();
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);
const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.REPORTS_EMAIL,
    pass: process.env.REPORTS_PASSWORD,
  },
});

const io = new Server(server, {});

// Sockets Events

io.on("connection", (socket) => {
  console.log("Cliente conectado");
  socket.on("sendToServer", async (data) => {
    // DATA PROCESSING
    console.log(data);
    const pool = await Pool.findOne({ _id: data.idPool });
    await pool.sensorDataHistory.push({ date: data.date, ph: data.value });
    await pool.save();
    console.log(pool);

    // const owner = await User.findById(data.idOwner);
    // const mailOptions = {
    //   from: "PLOMO REPORTES",
    //   to: owner.email,
    //   subject: "REPORTE PH",
    //   text: "TIENE QUE HECHARLE 4L DE CLORO",
    // };
    // transporter.sendMail(mailOptions, (e, i) => {
    //   console.log(e, i);
    //   console.log("Email enviado");
    // });
  });
});
