"user strict";

const pool = require('../database/db');
const promisePool = pool.promise();

const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO Asiakas (Sahkoposti, salasana) VALUES (?,?);', params
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getUser = async (id) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM Asiakas WHERE AsiakasNumero = ?;', [id]
        );
        return rows;
    } catch (e) {
        console.log("errori userModel - getUser", e.message);
    }
};

const getUserLogin = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM Asiakas WHERE sahkoposti = ?;', params
        );
        return rows;
    } catch (e) {
        console.log('error from getUserLogin', e.message);
    }
};

module.exports = {
    addUser,
    getUser,
    getUserLogin,
}