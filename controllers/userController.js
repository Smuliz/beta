"user strict";
const userModel = require("../models/userModel");

const user_get = async (req,res) => {
    const user = await userModel.getUser(req.params.Sahkoposti);
    await res.json(user[0]);
};

module.exports = {user_get};
