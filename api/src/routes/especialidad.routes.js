const {Router} = require('express');

const {
    getEspecidalidades
} = require('../controllers/especialidad.controllers');

const router = Router();

router.get('/allespecialidades', getEspecidalidades);

module.exports = router;