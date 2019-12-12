'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getLista = async (id) => {
    try {
        const [rows] = await promisePool.execute(
            'Select * FROM Lista WHERE ListaNumero = ?;', [id]
        );
        return rows;
    } catch (e) {
        console.log("error listaModel - getLista", e.message);
    }
};

const getAllLista = async () => {
    try {
        const [rows] = await    promisePool.execute(
            'SELECT * FROM Lista'
        );
        return rows;
    } catch (e) {
        console.log("lista_get_all ERROR", e.message);
    }
};

const addLista = async (params) => {
    console.log("addLista suoriutuu")
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO Lista (ListaNimi, AsiakasNumero) VALUES (?,?);', params
        );
        return rows;
    } catch (e) {
        console.log("Error in listaModel - addLista", e.message);
    }
};

const deleteLista = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM Lista WHERE ListaNumero = ?;', params
        );
        return rows;
    } catch (e) {
        console.log("error in listaModel - deleteLista", e.message);
    }
};

module.exports = {
    addLista,
    deleteLista,
    getLista,
    getAllLista,
}