"use strict";

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

router.get("/:id", userController.user_get);

router.get("/user", (req,res) => {
    res.send("with this endpoint you can get users.");
});

module.exports = router;
