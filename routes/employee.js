const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const EmployeeController = require("../controllers/EmployeeController")
const upload = require("../middleware/upload")

const authenticate = require("../middleware/authenticate")




router.get('/hi', (req, res, next) => {
    res.send('Welcome to Home Page')
  });
// router.get("/, EmployeeController.index")
// router.post("/show", EmployeeController.show)
// router.post("/store", upload.array("profileImage[]"),EmployeeController.store)
// router.post("/update", EmployeeController.update)
// router.post("/delete", EmployeeController.delete)


module.exports = router
