'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const tuoteController = require('../controllers/tuoteController');

router.get('/', tuoteController.tuote_list_get);

router.get('/:id', tuoteController.tuote_get);

router.post('/',tuoteController.tuote_create_post);
router.put('/',tuoteController.tuote_update);

/*router.post('/', upload.single('item'), (req,res,next)=>{
  console.log('item post file', req.file);
  //tiedoston nimi bodyyn jos haluaa
  //req.body.filename = req.file.filename;
  if(req.file === undefined){
    res.json({
      error:'NO file',
    });
  }else if(!req.file.mimetype.includes('image')){
    res.json({
      error:'Not image',
    });
  }else {
    next();
  }
});

 */
router.delete('/:id',tuoteController.tuote_delete);


module.exports = router;