const {Router} = require('express');

const{
    getAllInscriptosTit,
    editInscriptoTit,
    updestadoinscriptotit,
}= require('../controllers/inscriptosTit.controllers');

const router = Router();

//trae todos los inscriptos de titularizacion
router.post('/inscriptostit', getAllInscriptosTit);

//Modifica datos del inscripto
router.put('/editinscriptotit/:idInscriptoTit',editInscriptoTit);

//Actualiza estado de inscripto
router.put('/updestadoinscriptotit/:idInscriptoTit', updestadoinscriptotit);

module.exports=router;