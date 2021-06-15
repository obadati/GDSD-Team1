const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/*Create Company */
router.post("/", controller.createCompany);

/*Delete Company */
router.delete("/:id", controller.deleteCompany);

/*Update Company */
router.put("/:id", controller.updateCompany);

/*Get All Company */
router.get("/:page", controller.getAllCompanies);


/*Get List of Image By CompanyId */
router.get("/agentList/:page", controller.getListOfAgent);


/*Get Agent Properties */
router.get("/agentPropertyList/:page",controller.agentProperty);

/*Export  Router*/
module.exports = router;
