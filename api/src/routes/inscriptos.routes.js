const {Router} = require('express');

const {
    getAllInscriptosMov,
    editInscriptoMov,
    updateIdVacanteGenerada,
    validateDniAsignado,
    updateEstadoAsignadoInscripto
} = require('../controllers/inscriptosMov.controllers');

const router = Router();


//Traer todos los inscriptos.
router.post('/inscriptosmov', getAllInscriptosMov);

//Modificar datos del inscripto.
router.put('/editinscriptosmov/:idInscriptoMov', editInscriptoMov);

//Actualiza el id de vacante_generada_cargo_actual, paso por params:id_inscripto y por body:id de vacante nueva
router.put('/updatevacantegenerada/:idInscriptoMov', updateIdVacanteGenerada);

//Valida y muestra datos si el dni de un inscripto en un mismo listado, ya tiene una asignacion
router.post('/validatedniasignado', validateDniAsignado);

//Actualiza el id del estado Asignado Inscripto: 1-"Asignado" / 2-"No Asignado" / 3-"En Espera"
router.put('/updateestadoinscripto/:idInscriptoMov', updateEstadoAsignadoInscripto);

module.exports = router;