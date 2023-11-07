const express = require("express");
const app = express();
const home = require("./routes/home");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;

app.use(express.json());
app.use(cors());


app.use("/home", home);


async function start() {
  await mongoose.connect(cluster, console.log(`Connected to ${cluster}`), {
    useNewUrlParser: true,
  });

  try {
    app.listen(port, console.log(`Servers up on port ${port}`));
  } catch (error) {
    console.error(error);
  }
}

start();
