'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const kauppaController = require('../controllers/kauppaController');

router.get('/', kauppaController.kauppa_list_get);
router.post('/',kauppaController.kauppa_list_get);

router.get('/:id', kauppaController.kauppa_get);

//router.post('/',kauppaController.kauppa_create_post);
//router.put('/',kauppaController.kauppa_update);

router.delete('/:id',kauppaController.kauppa_delete);


module.exports = router;