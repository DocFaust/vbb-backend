//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/player", require("./routes/player"));
app.use("/players", require("./routes/players"));

app.listen(port, () => {
  console.log("Server started at Port " + port);
});
