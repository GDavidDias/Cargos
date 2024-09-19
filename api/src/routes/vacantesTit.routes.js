const {Router} = require('express');

const {
    getAllVacantesTit,
    getVacanteAsignadaTit,
    getVacanteTitAsignadaInscripto,
    editVacanteTit,
    delVacanteTit,
    createVacanteTit
}= require('../controllers/vacantesTit.controllers');

const router = Router();

//trae todas las vacantes se aplican filtros por body
router.post('/allvacantestit', getAllVacantesTit);

//tree datos de una vacante
router.post('/vacantetit/:idVacanteTit', getVacanteAsignadaTit);

//trae datos del inscripto que tiene una vacante asignada
router.post('/vacantetitasignadainscripto/:idVacanteTit', getVacanteTitAsignadaInscripto);

//edita una vacante
router.put('/editvacantetit/:idVacanteTit',editVacanteTit);

//Elimina una Vacante 
router.put('/delvacantetit/:idVacanteTit', delVacanteTit);

//crea una nueva vacante
router.post('/newvacantetit',createVacanteTit);

module.exports = router;