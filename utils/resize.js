"use strict";
const sharp = require("sharp");

const makeThumbnail = async (file, thumbname, size) => {
    const result = await sharp(file).
    resize(size.width, size.height).
    png().
    toFile(thumbname);
    return result;
};

module.exports = {
    makeThumbnail,
}