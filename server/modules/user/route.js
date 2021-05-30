const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Create User */
router.post("/",controller.create);

/*Login User */
router.post("/login",controller.login);

module.exports = router;