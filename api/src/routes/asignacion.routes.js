const {Router} = require('express');

const{
    createAsignacionMov,
    editAsignacionMov,
    getAsignacionByVacante,
    delAsignacionMov,
    getAllAsignacionesMov
} = require('../controllers/asignacionMov.controllers');

const router = Router();

//Crear una signacion de un docente a una vacante
router.post('/createasignacionmov', createAsignacionMov);

//Modificar una asignacion
//con id de asignacion se genera una observacion con fecha de actualizacion.
router.put('/editasignacionmov/:idAsignacionMov', editAsignacionMov);

//Trae datos de la ASignacion de una vacante (id_vacante_mov)
router.post('/asignacionbyvacante/:idVacante', getAsignacionByVacante);

//actualiza el campo obsDesactiva, para desactivar la asignacion (eliminarla)
router.post('/delasignacionmov/:idAsignacionMov', delAsignacionMov);

//Trae todas las asignaciones realizadas en la tabla asignacion_mov
router.post('/allasignacionesmov', getAllAsignacionesMov);

module.exports = router;