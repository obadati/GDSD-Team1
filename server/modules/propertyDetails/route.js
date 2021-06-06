const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/


/***********************************************Agent Dashboard******************************************/

/*Create Properties */
router.post("/",controller.create);

/*Get Agent Properties */
router.get("/agentProperty/:page",controller.agentProperty);

/*Get Agent Properties */
router.get("/agentPropertyByStatus/:page",controller.agentPropertyByStatus);

/*Update Property*/
router.put("/updateProperty/:id",controller.updateProperty);

/*Add Property Image*/
router.post("/images/",controller.addPropertyImage);

/*********************************************************Website User*********************************/
/*All Properties */
router.get("/:page",controller.getAllProperty);

/*Get Property By Detail By Id*/
router.get("/propertyDetail/:id", controller.getPropertyById);

/*Filter Property By Category */
router.get("/category/:page",controller.propertyByCategoryId);

/*Filter Property By Text */
router.get("/search/",controller.searchPropertyByText);

/******************************************************Admin Dashboard***********************************/
/*Get List of Property By Admin */
router.get("/getAllPropertyByAdmin/:page",controller.getAllPropertyByAdmin)

/*Get List of Property By Admin */
router.get("/getAllPropertyByAdminStatus/:page",controller.getAllPropertyByAdminStatus)

/*Delete Property */
router.delete("/:id",controller.deleteProperty)


/*Export  Router*/
module.exports = router;