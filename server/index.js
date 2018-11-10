const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect(
  "mongodb://dlxh:1988grz@ds159631.mlab.com:59631/dlxh",
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public/uploads/"));

require("./routes/api")(app);

const port = "4000";
app.listen(port);
console.log("Magic happens at " + port);
