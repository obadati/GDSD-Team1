const express = require('express');
const router = express.Router();
const controller = require('../category/controller');

/*Create Categories */
router.post("/",controller.create);

/*Get All Categories */
router.get("/",controller.getAllCategory);

/*Delete Category */
router.delete("/:id",controller.deleteCategory);

module.exports = router;

