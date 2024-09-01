const {Router} = require('express');

const {
    getAllVacantesMov,
    editVacantesMov,
    createVacantesMov,
    getVacantesMovDisp,
    getVacantesMovDispByEsp,
    delVacanteMov,
    getVacanteMovAsignada
} = require('../controllers/vacantesMov.controllers');

const router = Router();

// Traer todas las vacantes
router.get('/allvacantesmov', getAllVacantesMov);

//--Modificar una vacante.
router.put('/editvacantemov/:idVacanteMov', editVacantesMov);

//--Crear una vacante.
router.post('/vacantemov', createVacantesMov);

//--Traer todas las vacantes disponibles.
router.post('/vacantesdisp', getVacantesMovDisp);

//--Traer las vacantes disponibles según especialidad.
router.get('/vacantesmovesp/:idEspecialidad', getVacantesMovDispByEsp)

//--DAR DE BAJA UNA VACANTE CON UNA OBSERVACION
// Se le pasa por parametro el id de la vacante (idVacanteMov)
// y por body la observacion de la baja de vacante
router.put('/delvacantemov/:idVacanteMov', delVacanteMov);

//--Trae los datos de una VACANTE ASIGNADA
router.post('/vacanteasignada/:idVacanteMov', getVacanteMovAsignada);

module.exports = router;