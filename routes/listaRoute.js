'use strict';
const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaController');


router.get('/', listaController.lista_get_all);
router.get('/:id', listaController.lista_get);

router.post('/', listaController.lista_create_post);
router.put('/',listaController.lista_update);
router.delete('/:id', listaController.lista_delete);

module.exports = router;


