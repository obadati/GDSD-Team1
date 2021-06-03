const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Query */
router.post("/",controller.createQueries);

/*Get Query */
router.get("/:page",controller.getQueries)

/*Delete Query */
router.delete("/:id",controller.deleteQueries);

/*Export  Router*/
module.exports = router;
