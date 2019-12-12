'use strict';
const tuoteModel = require('../models/tuoteModel');

const tuote_list_get = async (req,res) => {
  const tuotteet = await tuoteModel.getAllTuoteet();
  await res.json(tuotteet);
};
const tuote_get = async (req,res) => {
  const tuote = await tuoteModel.getTuote(req.params.id);
  console.log(tuote[0]);
  await res.json(tuote[0]);
};
const tuote_create_post = async (req, res) => {
  try {
    const params = [
      req.body.name,

    ];
    console.log('create', params);
    const result = await tuoteModel.addTuote(params);
    console.log(result);
    const params2 = [
      req.body.maara,
      result.insertId,
        1,
    ];
    const result2 = await tuoteModel.addMaara(params2);
    await res.json({message: 'upload ok'});
  } catch (e) {
    console.log('exif error', e);
    res.status(400).json({message: e.message});
  }


};
const tuote_update = async (req,res) =>{
  const params = [
      req.body.name,

  ];

  const result = await tuoteModel.updateTuote(params);
  await res.json(result);
  console.log(result);
  const params2 = [
    req.body.maara,

  ];
  const result2 = await tuoteModel.updateMaara(params2);
  await res.json(result2);
};
const tuote_delete = async (req, res) => {
  const params = [
    req.params.id,
  ];
  console.log(params,"Täällä");
  const result = await tuoteModel.deleteTuote(params);
  await res.json(result);
  const params2 = [
    req.params.id,
  ];
  const result2 = await tuoteModel.deleteMaara(params2);
  await res.json(result);
};

module.exports = {
  tuote_list_get,
  tuote_get,
  tuote_create_post,
  tuote_update,
  tuote_delete,
};
