"use strict";

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
const alennusController = require("../controllers/alennusController");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

router.get("/:id", alennusController.alennus_get);

router.post("/", upload.single("alennus"), (req,res,next) => {
    if (req.file === undefined) {
        res.json({error: "no file for alennusRoute - router.post upload single"});
    } else if ( !req.file.mimetype.includes('image')){
        res.json({ error: "not an image",
    });
    } else {
        next();
    }
});

router.post("/",
    [
    body('KauppaNumero').isNumeric().excape(),
    body('AsiakasNumero').isNumeric().escape(),

    ],
alennusController.alennus_create
);

router.delete("/:id", alennusController.alennus_delete);

module.exports = {
    router,
}