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
  const params = [
        req.body.name,
        req.body.maara,

      ];
      console.log('create',params);
      const result = await tuoteModel.addTuote(params);
      await res.json({message: 'upload ok'});

};
const tuote_update = async (req,res) =>{
  const params = [
      req.body.name,
      req.body.maara,
      req.body.id,
  ];
  const result = await tuoteModel.updateTuote(params);
  await res.json(result);
};
const tuote_delete = async (req, res) => {
  const params = [
    req.params.id,
  ];
  const result = await tuoteModel.deleteTuote(params);
  await res.json(result);
};

module.exports = {
  tuote_list_get,
  tuote_get,
  tuote_create_post,
  tuote_update,
  tuote_delete,
};
