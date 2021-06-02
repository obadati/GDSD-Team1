const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Properties */
router.post("/",controller.create);

/*Filter Property By Text */
router.get("/search/",controller.searchPropertyByText);

/*All Properties */
router.get("/:page",controller.getAllProperty);

/*Get Property By Detail By Id*/
router.get("/propertyDetail/:id", controller.getPropertyById);

/*Filter Property By Category */
router.get("/category/:page",controller.propertyByCategoryId);

/*Add Property Image*/
router.post("/images/",controller.addPropertyImage);

/*Delete Property */
router.delete("/:id",controller.deleteProperty)

/*Export  Router*/
module.exports = router;