const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/***********************************Agent Route**********************************************************/
/*Create Contract */
router.post("/",controller.create);

/*Edit Contract */
router.patch("/:id",controller.edit);

/*Get Contract By Agent */
router.get("/userId/",controller.getAllContractByAgent);

/*Get Contract By Id */
router.get("/:id",controller.getById);

/*Get Contract By Status */
router.get("/agent/status/:page",controller.getAllContractByAgentStatus);

/*Delete Contract */
router.delete("/:id",controller.delete);

/*Edit Contract */
router.patch("/:id",controller.endContract);

/*************************************************Buyer Route**********************************************/
/*Accept Contract */
router.patch("/buyer/contract",controller.contract);

/*Get Contract By Buyer */
router.get("/buyer/all/:page",controller.getAllContractByBuyer);

/*Get Contract By Status */
router.get("/buyer/status/:page",controller.getAllContractByBuyerStatus);

/*Export  Router*/
module.exports = router;

