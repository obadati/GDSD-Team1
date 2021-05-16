const express = require('express');
const router = express.Router();
const controller = require('./controller');

/*Create Properties */
router.post("/",controller.create);

/*All Properties */
router.get("/",controller.getAllProperty);

/*Filter Property By Text */
router.get("/search",controller.searchPropertyByText);

/*Filter Property By Category */
router.get("/category/:id",controller.propertyByCategoryId);

/*Delete Property */
router.delete("/:id",controller.deleteProperty)

module.exports = router;