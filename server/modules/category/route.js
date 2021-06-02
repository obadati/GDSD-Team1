const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Categories */
router.post("/",controller.create);

/*Get All Categories */
router.get("/",controller.getAllCategory);

/*Get Single Category By Properties */
router.get("/:id/search/",controller.searchPropertyByCategoryText);

/*Delete Category */
router.delete("/:id",controller.deleteCategory);

/*Export  Router*/
module.exports = router;

