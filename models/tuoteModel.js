'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllTuoteet = async () => {
  try{
    const [rows] = await promisePool.execute('SELECT * FROM Tuote INNER JOIN Relationship on Tuote.TuoteNumero = Relation.TuoteNumero order by Tuote.tuotenumero;');
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
        'INSERT INTO Tuote (TuoteNimi) VALUES ( ?);',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const addMaara = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO Relationship (TuoteMaara,TuoteNumero) VALUES (?,?);',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const updateTuote = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE `Tuote` SET `TuoteNimi`= ?,`Maara`= ? WHERE TuotenNumero = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const deleteTuote = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM Tuote WHERE `TuoteNumero` = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  addMaara,
  getAllTuoteet,
  getTuote,
  addTuote,
  updateTuote,
  deleteTuote,
};