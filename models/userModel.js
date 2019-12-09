"user strict";

const pool = require('../database/db');
const promisePool = pool.promise();

const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO Asiakas (Sahkoposti, Salasana) VALUES (?,?);', params
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

const getUser = async (sposti) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM Asiakas WHERE Sahkoposti = ?;', [sposti]
        );
        return rows;
    } catch (e) {
        console.log("error userModel - getUser", e.message);
    }
};

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM Asiakas;');
        return rows;
    } catch (e) {
        console.log('error userModel getAllUsers', e.message);
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
    getAllUsers,
    getUserLogin,
}