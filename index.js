const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");

//Init server

const app = express();

//Data base

dbConnection();

//Cors

app.use(cors({ origin: allowedOrigins }))

//Public

app.use(express.static("public"));

//Reading JSON

app.use(express.json());
//Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
//Listening

app.listen(process.env.PORT, () => {
  console.log(`Server online port: ${process.env.PORT}`);
});
