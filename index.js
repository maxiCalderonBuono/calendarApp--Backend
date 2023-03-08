const express = require("express");
const path = require("path");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

//Init server

const app = express();

//Data base

dbConnection();

//Cors

app.use(cors(corsOptions));

//Public

app.use(express.static("public"));

//Reading JSON

app.use(express.json());
//Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//Listening

app.listen(process.env.PORT, () => {
  console.log(`Server online port: ${process.env.PORT}`);
});
