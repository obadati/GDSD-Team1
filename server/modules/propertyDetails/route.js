const express = require('express');
const router = express.Router();
const controller = require('./controller');

/**********************************Register Controller & Define Routing Path*****************************/

/***********************************************Agent Dashboard******************************************/


/*Add Property Image*/
router.post('/:uid/images', controller.addPropertyImage);

/*Create Properties */
router.post('/', controller.create);

/*Filter Property By Text */
router.get('/search', controller.searchPropertyByText);

/*Get Agent Properties */
router.get('/', controller.agentProperty);

/*Get Agent Properties */
router.get('/agentPropertyByStatus/:page', controller.agentPropertyByStatus);

/*Update Property*/
router.put('/:uid', controller.updateProperty);


/*********************************************************Website User*********************************/
/*All Properties */
router.get('/:page', controller.getAllProperty);

/*Get Property By Detail By Id*/
router.get('/propertyDetail/:id', controller.getPropertyById);

/*Filter Property By Category */
router.get('/category/:page', controller.propertyByCategoryId);



/*Find Property Average Price*/
router.get('/user/findAvgPrice', controller.findAvgPrice);

/*Filter properties */
router.get('/user/filterProperty/:page', controller.filterProperty);

router.get('/user/approve/agent/property/:page', controller.approvedAgentProperty);

/******************************************************Admin Dashboard***********************************/
/*Get Property By Detail By Id*/
router.get('/property/Image/', controller.getAllPropertyImage);

/*Get List of Property By Admin */
router.get('/getAllPropertyByAdmin/:page', controller.getAllPropertyByAdmin);

/*Get Property By Detail By Id*/
router.get('/property/Image/', controller.getAllPropertyImage);

/**Delete Propert Image from  Image Property Table */
router.delete ('/property/delete/image/',controller.deletePropertyImage)

/*Get List of Property By Admin */
router.get('/getAllPropertyByAdminStatus/:page',controller.getAllPropertyByAdminStatus
);
/*Approve Status By Admin */
router.patch('/approveProperty/status/:id/',controller.approveStatus)

/*Export  Router*/
module.exports = router;
