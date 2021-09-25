const express = require("express");
const app = express();
const port = 8000;

const env = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//Middwares

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(cors());
//environment variable or you can say consstants
env.config();

//routes

app.use("/api", require("./routes/test"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/admin"));
app.use("/api", require("./routes/service"));
app.use("/api", require("./routes/oder"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//mongodb conneciton

mongoose
  .connect(
    `mongodb+srv://e-temp:${process.env.USER_PASS}@e-temp.hrx7h.mongodb.net/${process.env.USER_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected e-temp ");
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
