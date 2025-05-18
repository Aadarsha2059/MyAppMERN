const express = require("express");
const router = express.Router();
const { registerStudent } = require("../controllers/studentController");

router.post(
    "/create",
    registerStudent
);

module.exports = router;
