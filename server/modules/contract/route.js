const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/***********************************Agent Route**********************************************************/


/*Edit Contract */
router.patch("/:id",controller.edit);

/*1. Get Contract By Agent */
router.get("/agent/",controller.getAllContractByAgent);

/*Get Contract By Id */
router.get("/:id",controller.getById);


/*Delete Contract */
router.delete("/:id",controller.delete);

/*************************************************Buyer Route**********************************************/
 /*Create Contract Request */
router.post("/",controller.createRequest);

/*Get Contract of Buyer */
router.get("/buyer/:page/",controller.getAllContractByBuyer);

/*Export  Router*/
module.exports = router;

