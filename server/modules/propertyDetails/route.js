const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Create Properties */
router.post("/",controller.create);

/*Filter Property By Text */
router.get("/search/",controller.searchPropertyByText);

/*All Properties */
router.get("/:page",controller.getAllProperty);

/*Filter Property By Category */
router.get("/category/:page",controller.propertyByCategoryId);

/*Delete Property */
router.delete("/:id",controller.deleteProperty)

module.exports = router;