const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");
const upload = require('../middlewares/uploader');

// Admin API
router.get("/users", dashboardController.userPage);
router.get("/users/create", dashboardController.createPage);
router.post("/users/create", upload.single("photo"), dashboardController.createUser);

//  view engine ga ada put patch delete
module.exports = router;
