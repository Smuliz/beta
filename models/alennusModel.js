"use strict";

const pool = require("../database/db");
const promisePool = pool.promise();

const getAlennus = async id => {
    try {
        const [rows] = await promisePool.execute("SELECT * FROM Alennus WHERE AlennusNumero = ?;", [id]);
        return rows;
    } catch (e) {
        console.log("error in getAlennus - alennusModel");
    }
};
// addAlennus kohdan parametrit tulee tarkistaa enne deploymenttia
const addAlennus = async params => {
    try {
        const [rows] = await promisePool.execute("INSERT INTO Alennus (AsiakaNumero, KauppaNumero, TuoteNumero, Alkamispaiva) VALUES (?;?;?;?);", params);
        return rows;
    } catch (e) {
        console.log("error in addAlennus - alennusModel", e.message);
    }
};

const deleteAlennus = async params => {
    try {
        const [rows] = await promisePool.execute("DELETE FROM Alennus WHERE AlennusNumero = ?", params);
        return rows;
    } catch (e) {
        console.log("error in deleteAlennus - alennusModel", e.message);
    }
};

module.exports = {
    getAlennus,
    addAlennus,
    deleteAlennus,
}