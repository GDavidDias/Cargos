const {Router} = require('express');

const {
    validateUser
} = require('../controllers/user.controllers');

const router = Router();

router.post('/validate', validateUser);

module.exports = router;