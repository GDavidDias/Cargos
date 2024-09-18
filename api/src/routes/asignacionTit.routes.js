const {Router} = require('express');

const{
    createAsignacionTit
} = require('../controllers/asignacionTit.controllers');

const router = Router();

//crea una asignacion de docente a vacante
//paso datos por body
router.post('/createasignaciontit', createAsignacionTit);

module.exports = router;