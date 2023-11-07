const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");


router.route("/").get(homeController.rukshan).post(homeController.createUsers).delete(homeController.DeleteAccount);

router.route("/login").get(homeController.apiCall).post(homeController.LoginAccount);

module.exports = router;
