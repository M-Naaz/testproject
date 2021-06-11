const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const EmployeeRoute = require("./routes/employee");
const AuthRoute = require("./routes/auth");
mongoose.connect("mongodb+srv://naaz:naaz@cluster0.2d9o8.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology:true})
.then(() => console.log("database connection established"))
.catch("error",(err) =>console.log(err));

const app = express();
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static("uploads"))
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("server is running on port 3000")
});
  app.use("/api/employee", EmployeeRoute)
  app.use("/api", AuthRoute)


















