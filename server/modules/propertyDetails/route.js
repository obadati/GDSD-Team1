const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post("/add",controller.create);

router.get("/",controller.getAllProperty);

router.get("/search/",controller.searchPropertByText);

router.get("/categoryId/:id",controller.propertyByCategoryId);

router.delete("/:id",controller.deleteProperty)

module.exports = router;