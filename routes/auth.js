const express = require("express")
const router = express.Router()

const AuthController = require("../controllers/AuthController");

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/update/:id", AuthController.update)
router.post("/show/:id", AuthController.show)
module.exports = router