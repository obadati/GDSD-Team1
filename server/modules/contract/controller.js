const db = require("../../models");
const user = require("../../models/user");
const Contract = db.contract;
const Property = db.propertyDetail;
const User = db.user;

/****************************************************Define Controller***********************************/

/**********************************************************Agent Dashboard ******************************/

/*Edit Contract*/
exports.edit = async (req, res) => {
  try {
    let id = req.params.id;
    let contract = await Contract.findOne({ where: { id: id } });
    if (contract == null) {
      return res.status(404).json({ message: "No Contract Found" });
    } else {
      let {dateValid,status} = req.body;
      if(status == "rejected"){
        await Contract.destroy({
          where: { id: id },
        });
        return res.status(200).json({ message: "Contrat Rejected Successfully" });
      }
      await Contract.update(
        {
          status: status,
          dateCreate: new Date().toLocaleDateString(),
          dateValid: dateValid,
        },
        { where: { id: id } }
      );
      return res.status(200).json({
        message: "Contract Update Successfully",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/*Get Contract By Id*/
exports.getById = async (req, res) => {
  try {
    let id = req.params.id;
    let contract = await Contract.findOne({ where: { id: id } });
    if (contract == null) {
      return res.status(404).json({ message: "No Contract Found" });
    } else {
      return res.status(200).json(contract);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/*Delete Contract*/
exports.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let contract = await Contract.findOne({ where: { id: id } });
    if (contract == null) {
      return res.status(404).json({ message: "No Contract Found" });
    } else {
      await Contract.destroy({
        where: { id: id },
      });
      return res.status(200).json({ message: "Contrat Delete Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/*3. List Of All Contrct By Agent */
exports.getAllContractByAgent = async (req, res) => {
  try {

    
    let limit = 8;
    let offset = 0;
    let { agentId,page } = req.query;
  
    if(page < 0){
      Contract.findAndCountAll({ where: { agentId: agentId } }).then((data) => {
       
  
        Contract.findAll({
          
          attributes: [
            "id",
            "propertyId",
            "title",
            "description",
            "dateCreate",
            "dateValid",
            "agentId",
            "seller",
            "buyerId",
            "buyer",
            "status",
          ],
          order: [["id", "DESC"]],
          include: [
            {
              model: db.propertyDetail,
              attributes: ["id", "images"],
            },
          ],
          
          where: { agentId: agentId},
          limit: limit,
          offset: offset,
  
          
        }).then((property) => {
          if (property.length > 0) {
            return res
              .status(200)
              .json({ result: property, count: data.count, pages: 1 });
          } else {
            return res.status(404).json([]);
          }
        });
      });
    }
    else{

    

    Contract.findAndCountAll({ where: { agentId: agentId } }).then((data) => {
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Contract.findAll({
        
        attributes: [
          "id",
          "propertyId",
          "title",
          "description",
          "dateCreate",
          "dateValid",
          "agentId",
          "seller",
          "buyerId",
          "buyer",
          "status",
        ],
        order: [["id", "DESC"]],
        include: [
          {
            model: db.propertyDetail,
            attributes: ["id", "images"],
          },
        ],
        
        where: { agentId: agentId},
        limit: limit,
        offset: offset,

        
      }).then((property) => {
        if (property.length > 0) {
          return res
            .status(200)
            .json({ result: property, count: data.count, pages: pages });
        } else {
          return res.status(404).json([]);
        }
      });
    });
  }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/**********************************************************Buyer Dashboard ******************************/

/*Create Contract Request By Buyer*/
exports.createRequest = async (req, res) => {
  try {
    let { propertyId, agentId,buyerId } = req.body;
    let property = await Property.findOne({ where: { id: propertyId } });
    let agent =await User.findOne({where:{id:agentId}})
    let buyer =await User.findOne({where:{id:buyerId}})
      if (property != null) {
          let data = {
            buyerId: buyerId,
            agentId: agentId,
            propertyId,
            title:property.title,
            description:property.description,
            dateCreate:null,
            dateValid:null,
            status: "pending",
            approve: "no",
            seller:agent.firstName+' '+agent.lastName,
            buyer:buyer.firstName+' '+buyer.lastName,
          };
          await Contract.create(data);
          return res.status(200).json(data);
        
      } else {
        return res.status(404).json({ message: "No Property Found" });
      }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

/*List Of All Contrct By Buyer*/
exports.getAllContractByBuyer = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    let { buyerId } = req.query;
    let page = req.params.page;

    if(page < 0){

      Contract.findAndCountAll({ where: { buyerId: buyerId } }).then((data) => {
     
       
        Contract.findAll({
          attributes: [
            "id",
            "title",
            "description",
            "dateCreate",
            "dateValid",
            "buyerId",
            "buyer",
            "seller",
            "agentId",
            "status",
          ],
          order: [["id", "DESC"]],
          include: [
            {
              model: db.propertyDetail,
              attributes: ["id", "images"],
            }
          ],
          where: { buyerId: buyerId },
          limit: limit,
          offset: offset,
        }).then((property) => {
          if (property.length > 0) {
            return res
              .status(200)
              .json({ result: property, count: data.count, pages: 1 });
          } else {
            return res.status(404).json([]);
          }
        });
      });
    }
    else{

    

    

    Contract.findAndCountAll({ where: { buyerId: buyerId } }).then((data) => {
     
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Contract.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "dateCreate",
          "dateValid",
          "buyerId",
          "buyer",
          "seller",
          "agentId",
          "status",
        ],
        order: [["id", "DESC"]],
        include: [
          {
            model: db.propertyDetail,
            attributes: ["id", "images"],
          }
        ],
        where: { buyerId: buyerId },
        limit: limit,
        offset: offset,
      }).then((property) => {
        if (property.length > 0) {
          return res
            .status(200)
            .json({ result: property, count: data.count, pages: pages });
        } else {
          return res.status(404).json([]);
        }
      });
    });
  }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

