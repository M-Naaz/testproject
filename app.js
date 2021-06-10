const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");


const EmployeeRoute = require("./routes/employee");
const AuthRoute = require("./routes/auth");

mongoose.connect("mongodb://localhost:27017/testdb",{useNewUrlParser: true, useUnifiedTopology:true},(err,res) =>{
 const db = mongoose.connection

db.on("error", (err) => {
    console.log(err)
})
db.once("open", () => {
    console.log("database connection established")
})

const app = express();

app.use(morgan(""))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static("uploads"))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is running on port 3000")
});
  app.use("/api/employee", EmployeeRoute)
  app.use("/api", AuthRoute)
});