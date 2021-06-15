const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Company */
router.post("/conversation", controller.createConversation);
router.get("/conversation/:userId", controller.getuserConversations);
router.post("/sendMessage", controller.sendMessage);
router.get("/getMessages/:userId", controller.getMessages);



/*Export  Router*/
module.exports = router;
