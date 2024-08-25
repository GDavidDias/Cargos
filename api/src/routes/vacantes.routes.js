const {Router} = require('express');

const {
    getAllVacantesMov
} = require('../controllers/vacantes.controllers');

const router = Router();

router.get('/allvacantesmov', getAllVacantesMov);

module.exports = router;