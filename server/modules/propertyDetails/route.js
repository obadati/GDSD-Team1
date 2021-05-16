const express = require('express');
const router = express.Router();
const controller = require('../propertyDetails/contoller');

router.post("/",controller.create);

router.get("/",controller.getAllProperty);

router.get("/data",controller.searchPropertyByText);

router.get("/categoryId/:id",controller.propertyByCategoryId);

router.delete("/:id",controller.deleteProperty)

module.exports = router;