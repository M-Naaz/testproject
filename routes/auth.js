const express = require("express")
const router = express.Router()
const { upload } = require("../util/upload");
const authenticate = require("../middleware/authenticate")
const AuthController = require("../controllers/AuthController");

const  singleUpload = upload.single('profileImage');

router.post("/register", [singleUpload],AuthController.register)
router.post("/login", AuthController.login)
router.patch("/update/:id",authenticate,singleUpload, AuthController.update)
router.get("/show/:id",authenticate, AuthController.show)

module.exports = router