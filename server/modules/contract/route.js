const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/***********************************Agent Route**********************************************************/


/*Edit Contract */
router.patch("/:id",controller.edit);

/*1. Get Contract By Agent */
router.get("/agent/:page",controller.getAllContractByAgent);

/*Get Contract By Id */
router.get("/:id",controller.getById);

/*Get Contract By Status */
router.get("/agent/status/:page",controller.getAllContractByAgentStatus);

/*Delete Contract */
router.delete("/:id",controller.delete);

/*Edit Contract */
router.patch("/:id",controller.endContract);

/*************************************************Buyer Route**********************************************/
 /*1. Create Contract Request */
router.post("/",controller.createRequest);



/*Accept Contract */
router.patch("/buyer/contract",controller.contract);

/*2. Get Contract of Buyer */
router.get("/buyer/:page/",controller.getAllContractByBuyer);

/*Get Contract By Status */
router.get("/buyer/status/:page",controller.getAllContractByBuyerStatus);

/*Export  Router*/
module.exports = router;

