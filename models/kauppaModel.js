'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllKaupat = async () => {
  try{
    const [rows] = await promisePool.execute('SELECT `Osoite`,`KauppaNimi`,KauppaNumero FROM `Kauppa` ORDER BY `KauppaNumero`;');
    return rows;
  }catch (e) {
    console.log('error',e.message);
  }
};
const getKauppa = async (id) => {
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM `Kauppa` WHERE `KauppaNumero` = ?;',
        [id]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const addKauppa = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO `Kauppa` (KauppaNimi,Paikkatieto,Osoite) VALUES (?,? ?);',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const updateKauppa = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE `Kauppa` SET `KauppaNimi`= ?,`Paikkatieto`= ?,`Osoite`= ? WHERE `KauppaNumero` = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};
const deleteKauppa = async (params) => {
  try {
    const [rows] = await promisePool.execute(
        'DELETE FROM `Kauppa` WHERE `KauppaNumero` = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllKaupat,
  getKauppa,
  addKauppa,
  updateKauppa,
  deleteKauppa,
};