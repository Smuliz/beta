'use strict';
const kauppaModel = require('../models/kauppaModel');

const kauppa_list_get = async (req,res) => {
  const kaupat = await kauppaModel.getAllKaupat();
  await res.json(kaupat);
};
const kauppa_get = async (req,res) => {
  const kauppa = await kauppaModel.getKauppa(req.params.id);
  console.log(kauppa[0]);
  await res.json(kauppa[0]);
};
const kauppa_create_post = async (req, res) => {
  try {
    const params = [
      //tiedot

    ];
    console.log('create', params);
    const result = await kauppaModel.addKauppa(params);
    await res.json({message: 'upload ok'});
  } catch (e) {
    console.log('exif error', e);
    res.status(400).json({message: e.message});
  }


};


const kauppa_update = async (req,res) =>{
  const params = [
    //tiedot
  ];
  const result = await kauppaModel.updateKauppa(params);
  await res.json(result);
};


const kauppa_delete = async (req, res) => {
  const params = [
    req.params.id,
  ];
  const result = await kauppaModel.deleteKauppa(params);
  await res.json(result);
};

module.exports = {
  kauppa_list_get,
  kauppa_get,
  kauppa_create_post,
  kauppa_update,
  kauppa_delete,
};
