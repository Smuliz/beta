'use strict';
const listaModel = require('../models/listaModel');

const lista_get = async (req,res) => {
    const lista = await listaModel.getLista(req.params.id);
    await res.json(lista[0]);
};

const lista_get_all = async (req,res) => {
    const lista = await listaModel.getAllLista();
    await res.json(lista);
};

const lista_create_post = async (req,res) => {
    try {
        console.log("OLEN MYÖS TÄÄLLÄ",req);
        const params = [
            req.body.ListaNimi,
            req.user.AsiakasNumero,
        ];
        console.log("OLEN TÄÄLLÄT!!!!",params);
        const result = await listaModel.addLista(params);
        await res.json({message: "lista created"});
    } catch (e) {
        console.log("lista creation error lista controller", e);
        res.status(400).json({message: e.message});
    }
};



const lista_update = async (req,res) => {
    const params = [
        req.body.listaNimi,
        req.user.AsiakasNumero,
    ];
    const result = await kauppaModel.updateLista(params);
    await res.json(result);
};

const lista_delete = async (req,res) => {
    const params = [
        req.body.listaNimi
    ];
    const result = await listaModel.deleteLista(params);
    await res.json(result);
};

module.exports = {
    lista_create_post,
    lista_get,
    lista_update,
    lista_delete,
    lista_get_all,
}