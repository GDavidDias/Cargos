const {Router} = require('express');

const {
    getAllInscriptosMov,
    editInscriptoMov,
    updateIdVacanteGenerada
} = require('../controllers/inscriptosMov.controllers');

const router = Router();


//Traer todos los inscriptos.
router.post('/inscriptosmov', getAllInscriptosMov);

//Modificar datos del inscripto.
router.put('/editinscriptosmov/:idInscriptoMov', editInscriptoMov);

//Actualiza el id de vacante_generada_cargo_actual, paso por params:id_inscripto y por body:id de vacante nueva
router.put('/updatevacantegenerada/:idInscriptoMov', updateIdVacanteGenerada);

module.exports = router;