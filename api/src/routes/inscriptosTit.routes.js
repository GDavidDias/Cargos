const {Router} = require('express');

const{
    getAllInscriptosTit
}= require('../controllers/inscriptosTit.controllers');

const router = Router();

//trae todos los inscriptos de titularizacion
router.post('/inscriptostit', getAllInscriptosTit);

module.exports=router;