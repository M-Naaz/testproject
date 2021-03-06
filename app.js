const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const AuthRoute = require("./routes/auth");

mongoose.connect("mongodb+srv://naaz:naaz@cluster0.2d9o8.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database connection established"))
  .catch("error", (err) => console.log(err));

const app = express();

app.use(morgan("dev"))
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
//parse requests of content-type - application/json
app.use(bodyParser.json())
app.use('/uploads', express.static("uploads"))
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("server is running on port 3000")
});

app.use("/api", AuthRoute)


















