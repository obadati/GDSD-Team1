const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Create User */
router.post("/",controller.create);

/*Login User */
router.post("/login",controller.login);

/*Get User Image*/
router.get("/userImage/:id",controller.image);

/*Update User Image */
router.patch("/updateImage/:id",controller.updateImage);

module.exports = router;