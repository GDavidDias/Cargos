const getAllVacantesMov = require('./getAllVacantesMov.js');
const editVacantesMov = require('./editVacanteMov.js');
const createVacantesMov = require('./createVacanteMov.js');
const getVacantesMovDisp = require('./getVacantesMovDisp.js');
const getVacantesMovDispByEsp = require('./getVacantesMovDispByEsp.js');
const delVacanteMov = require('./delVacanteMov.js');
const getVacanteMovAsignada = require('./getVacanteMovAsignada.js');
const getVacanteMovInscripto = require('./getVacanteMovInscripto.js');

module.exports={
    getAllVacantesMov,
    editVacantesMov,
    createVacantesMov,
    getVacantesMovDisp,
    getVacantesMovDispByEsp,
    delVacanteMov,
    getVacanteMovAsignada,
    getVacanteMovInscripto
};

// Traer todas las vacantes
// Modificar una vacante.
// Crear una vacante.
// Traer todas las vacantes disponibles.
// Traer las vacantes disponibles según especialidad.
// Dar de baja una Vacante con una observación.
