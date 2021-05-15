const express = require('express');
const router = express.Router();
const controller = require('../category/controller');

router.post("/add",controller.create);

router.get("/",controller.getAllCategory);

router.delete("/:id",controller.deleteCategory);

module.exports = router;

