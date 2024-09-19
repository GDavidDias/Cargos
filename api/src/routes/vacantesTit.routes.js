const {Router} = require('express');

const {
    getAllVacantesTit,
    getVacanteAsignadaTit
}= require('../controllers/vacantesTit.controllers');

const router = Router();

//trae todas las vacantes se aplican filtros por body
router.post('/allvacantestit', getAllVacantesTit);

//tree datos de una vacante
router.post('/vacantetit/:idVacanteTit', getVacanteAsignadaTit);


module.exports = router;