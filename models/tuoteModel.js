'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllTuoteet = async () => {
  try{
    const [rows] = await promisePool.execute('SELECT * FROM Tuote order by Tuote.tuotenumero;');
    return rows;
  }catch (e) {
    console.log('error',e.message);
  }
};
const getTuote = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM Tuote WHERE TuoteNumero = ?;',
        [id]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const addTuote = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Tuote (tuoteNimi) VALUES ( ?);',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const updateTuote = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE `tuote` SET `tuoteNimi`= ?,`maara`= ? WHERE tuotenumero = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const deleteTuote = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM tuote WHERE `tuotenumero` = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllTuoteet,
  getTuote,
  addTuote,
  updateTuote,
  deleteTuote,
};