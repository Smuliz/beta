"user strict";

const alennusModel = require("../models/alennusModel");
const { validationResult } = require("express-validator");
const resize = require("../utils/resize.js");

const alennus_create = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array()});
    } else {
        try {
            const thumb = await resize.makeThumbnail(
                req.file.path,
                "thumbnails/" + req.file.filename,
                { width: 160,height: 160 }
            );
            console.log("Thumbnails,", thumb);
            const params = [
                req.body.KauppaNumero,
                req.body.AsiakasNumero,
                req.file.filename,

            ];
            const result = await alennusModel.addAlennus(params);
            await res.json({message: "upload ok"});
        } catch (e) {
            console.log("Error in alennus_create - alennusController")
        }
    }
};

const alennus_get = async (req,res) => {
    const alennus = await alennusModel.getAlennus(req.params.id);
    await res.json(alennus[0]);
};

const alennus_delete = async (req,res) => {
    const params = [req.params.id];
    const result = await alennusModel.deleteAlennus(params);
    await res.json(result);
};

module.exports = {
    alennus_create,
    alennus_delete,
    alennus_get,
}