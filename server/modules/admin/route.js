const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Admin */
router.post("/create",controller.create);

/*Admin Login */
 router.post("/login",controller.Login);

 /*All Agent */
 router.get("/allAgent/:page",controller.GetAgent);

 /*Get Agent By Status */
 router.get("/agentByStatus/:page",controller.GetAgentStatus);

 /*Approve or Change Status*/
 router.patch("/approveStatus/:id",controller.ApproveStatus);

/*Export  Router*/
module.exports = router;

