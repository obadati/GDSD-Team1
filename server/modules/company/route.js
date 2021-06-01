const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post("/", controller.createCompany);

router.delete("/:id", controller.deleteCompany);

router.get("/:page", controller.getAllCompanies);

module.exports = router;
