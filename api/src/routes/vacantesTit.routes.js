const {Router} = require('express');

const {
    getAllVacantesTit
}= require('../controllers/vacantesTit.controllers');

const router = Router();

//trae todas las vacantes se aplican filtros por body
router.post('/allvacantestit', getAllVacantesTit);



module.exports = router;