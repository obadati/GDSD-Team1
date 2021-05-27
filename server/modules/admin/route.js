const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Create Admin */
router.post("/create",controller.create);

/*Admin Login */
 router.post("/login",controller.Login);

module.exports = router;

