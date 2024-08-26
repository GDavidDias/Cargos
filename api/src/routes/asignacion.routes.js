const {Router} = require('express');

const{
    createAsignacionMov,
} = require('../controllers/asignacionMov.controllers');

const router = Router();

//Crear una signacion de un docente a una vacante
router.post('/createasignacionmov', createAsignacionMov);

//Modificar una asignacion


module.exports = router;