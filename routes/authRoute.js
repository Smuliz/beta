"use strict";
const express = require("express");
const router = express.Router();
const { body, sanitizeBody } = require("express-validator");
const authController = require("../controllers/authController");

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/register',
    [
        body('Sahkoposti', 'email is not valid'),
        body('Salasana', 'atleast one upper case letter & 8characters').
            matches('(?=.*[A-Z]).{8,}'),
        // sanitizeBody('Sahkoposti').escape(), // Turha ehkä, koska isEmail() käytössä aikaisemmin?
    ],
    authController.user_create,
    authController.login,
);

module.exports = router;