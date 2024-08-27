const {Router} = require('express');

const{
    createAsignacionMov,
    editAsignacionMov
} = require('../controllers/asignacionMov.controllers');

const router = Router();

//Crear una signacion de un docente a una vacante
router.post('/createasignacionmov', createAsignacionMov);

//Modificar una asignacion
//con id de asignacion se genera una observacion con fecha de actualizacion.
router.put('/editasignacionmov/:idAsignacionMov', editAsignacionMov);

module.exports = router;