const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Admin */
router.post("/create",controller.create);

 /*All Agent */
 router.get("/allAgent/:page",controller.getAgent);

 /*Get Agent By Status */
 router.get("/agentByStatus/:page",controller.getAgentStatus);

 /*Approve or Change Status*/
 router.patch("/approveStatus/:id",controller.gpproveStatus);

/*Export  Router*/
module.exports = router;

