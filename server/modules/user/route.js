const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create User */
router.post("/",controller.create);

/*Login User */
router.post("/login",controller.login);

/*Get User Image*/
router.get("/:id",controller.image);

/*Update User Image */
router.patch("/updateImage/:id",controller.updateImage);

/*Delete User */
router.delete("/:id",controller.deleteUser);

module.exports = router;