//jshint esversion:6
const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/player", require("./routes/player"));
app.use("/players", require("./routes/players"));
app.use("/season", require("./routes/season"));
app.use("/seasons", require("./routes/seasons"));

app.get("/", (req, res) => {
  res.send("vbb-backend is running");
})

app.listen(port, () => {
  console.log("Server started at Port " + port);
});
