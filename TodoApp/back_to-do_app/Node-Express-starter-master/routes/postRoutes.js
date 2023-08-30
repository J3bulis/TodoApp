// Tämä tiedosto ei ole käytössä

const express = require("express");
const postControllers = require("../controllers");

const router = express.Router();

router.route("/").get();

module.exports = router;
