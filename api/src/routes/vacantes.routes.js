const {Router} = require('express');

const {
    getAllVacantesMov,
    editVacantesMov,
    createVacantesMov,
    getVacantesMovDisp,
    getVacantesMovDispByEsp,
    delVacanteMov
} = require('../controllers/vacantesMov.controllers');

const router = Router();

// Traer todas las vacantes
router.get('/allvacantesmov', getAllVacantesMov);

//--Modificar una vacante.
router.put('/editvacantemov/:idVacanteMov', editVacantesMov);

//--Crear una vacante.
router.post('/vacantemov', createVacantesMov);

//--Traer todas las vacantes disponibles.
router.get('/vacantesdisp', getVacantesMovDisp);

//--Traer las vacantes disponibles según especialidad.
router.get('/vacantesmovesp/:idEspecialidad', getVacantesMovDispByEsp)

//--DAR DE BAJA UNA VACANTE CON UNA OBSERVACION
// Se le pasa por parametro el id de la vacante (idVacanteMov)
// y por body la observacion de la baja de vacante
router.put('/delvacantemov/:idVacanteMov', delVacanteMov);

module.exports = router;