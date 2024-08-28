const {Router} = require('express');

const {
    getConfiguracion
} = require('../controllers/configuracion.controllers');

const router = Router();

router.get('/configuracion', getConfiguracion);

module.exports = router;