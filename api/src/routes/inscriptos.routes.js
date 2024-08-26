const {Router} = require('express');

const {
    getAllInscriptosMov,
    editInscriptoMov
} = require('../controllers/inscriptosMov.controllers');

const router = Router();

//Traer todos los inscriptos.
router.get('/inscriptosmov', getAllInscriptosMov);

//Modificar datos del inscripto.
router.put('/editinscriptosmov/:idInscriptoMov', editInscriptoMov);

module.exports = router;