const {Router} = require('express');

const {
    getAllVacantesPyR
} = require('../controllers/vacantesPyR.controllers');

const router = Router();

//Trae todas las vacantes de Provisionales y Reemplazantes
router.post('/allvacantespyr', getAllVacantesPyR);


module.exports = router;
