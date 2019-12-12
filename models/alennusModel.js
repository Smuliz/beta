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
    console.log("addAlennus homma", params);
    try {
        const [rows] = await promisePool.execute("INSERT INTO Alennus (AsiakasNumero, KauppaNimi, KuvaNimi) VALUES (?,?,?);", params);
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

const getAllAlennus = async () => {
    try {
        const [rows] = await promisePool.execute(
            "SELECT * FROM Alennus;"
        );
        return rows;
    } catch (e) {
        console.log("Error in alennusModel - getAllAlennus", e.message);
    }
}

module.exports = {
    getAlennus,
    addAlennus,
    deleteAlennus,
    getAllAlennus,
}