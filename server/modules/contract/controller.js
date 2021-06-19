const db = require("../../models");
const Contract = db.contract;
const Property = db.propertyDetail;

/****************************************************Define Controller***********************************/

/**********************************************************Agent Dashboard ******************************/
/*Create Contract By Agent*/
exports.create = async (req, res) => {
  try {
    let { propertyId, title, description, dateCreate, dateValid } = req.body;
    let property = await Property.findOne({ where: { id: propertyId } });
    let contractExist = await Contract.findOne({
      where: { propertyId: propertyId },
    });
    if (!contractExist) {
      if (property != null) {
        let data = {
          buyerId: 0,
          agentId: property.agentId,
          propertyId,
          title,
          description,
          dateCreate,
          dateValid,
          status: "available",
          approve: "no",
        };
        await Contract.create(data);
        return res.status(200).json(data);
      } else {
        return res.status(404).json({ message: "No Property Found" });
      }
    } else {
      return res.status(404).json({ message: "Contract Already Exist" });
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};
/*Edit Contract*/
exports.edit = async (req, res) => {
  try {
    let id = req.params.id;
    let contract = await Contract.findOne({ where: { id: id } });
    if (contract == null) {
      return res.status(404).json({ message: "No Contract Found" });
    } else {
        let { title, description, dateCreate, dateValid,buyerId,status,approve } = req.body;
      await Contract.update(
        {
          title: title,
          description: description,
          status: status,
          approve: approve,
          dateCreate: dateCreate,
          dateValid: dateValid,
          buyerId:buyerId
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
exports.getById = async(req,res)=>{
    try{
        let id= req.params.id;
        let contract = await Contract.findOne({ where: { id: id } });
        if (contract == null) {
          return res.status(404).json({ message: "No Contract Found" });
        } else {
            return res.status(200).json(contract);
        }
    }
    catch(err){
      return  res.status(500).json({error:err.message})
    }
}
/*Delete Contract*/
exports.delete = async(req,res)=>{
    try{
        let id= req.params.id;
        let contract = await Contract.findOne({ where: { id: id } });
        if (contract == null) {
          return res.status(404).json({ message: "No Contract Found" });
        } else {
            await Contract.destroy({
                where: { id: id },
              });
            return res.status(200).json({message:"Contrat Delete Successfully"});
        }
    }
    catch(err){
      return  res.status(500).json({error:err.message})
    }
}

/*List Of All Contrct By Agent */
exports.getAllContractByAgent = async (req, res) => {
    try {
      let limit = 8;
      let offset = 0;
      let{agentId, status} = req.query;
      let page= req.params.page; 
      Contract.findAndCountAll({where:{agentId:agentId}}).then((data) => {
        
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
            "status",
          ],
          order: [["id", "DESC"]],
          include: {
            model: db.user,
            attributes: ["id", "firstName","lastName"],
          },
          where:{agentId:agentId},
          limit: limit,
          offset: offset,
        }).then((property) => {
          if (property.length > 0) {
            return res
              .status(200)
              .json({ result: property, count: data.count, pages: pages });
          } else {
            return res.status(404).json({ message: "Data Not Found" });
          }
        });
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

/*List Of All Contrct By Status */
exports.getAllContractByAgentStatus = async (req, res) => {
    try {
      let limit = 8;
      let offset = 0;
      let{agentId, status} = req.query;
      let page= req.params.page; 
      Contract.findAndCountAll({where:{agentId:agentId,status:status}}).then((data) => {
        
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
            "status",
          ],
          order: [["id", "DESC"]],
          include: {
            model: db.user,
            attributes: ["id", "firstName","lastName"],
          },
          where:{agentId:agentId,status:status},
          limit: limit,
          offset: offset,
        }).then((property) => {
          if (property.length > 0) {
            return res
              .status(200)
              .json({ result: property, count: data.count, pages: pages });
          } else {
            return res.status(404).json({ message: "Data Not Found" });
          }
        });
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

/*End Contract*/
exports.endContract = async (req, res) => {
    try {
      let id = req.params.id;
      let contract = await Contract.findOne({ where: { id: id } });
      if (contract == null) {
        return res.status(404).json({ message: "No Contract Found" });
      } else {
          
        await Contract.update(
          {
            status: "cancelled",
          },
          { where: { id: id } }
        );
        return res.status(200).json({
          message: "Contract End Successfully",
        });
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
/**********************************************************Buyer Dashboard ******************************/
exports.contract = async(req,res)=>{
    try{
        console.log("asdasdasdasdsa");        
        let {id, buyerId}=req.query;

        let contract = await Contract.findOne({ where: { id: id } });
        if (contract == null) {
            return res.status(404).json({ message: "No Contract Found" });
          } else {
            await Contract.update(
                {
                  status: "occupy",
                  buyerId:buyerId
                },
                { where: { id: id } }
              );
              return res.status(200).json({
                message: "Please Wait For Agent To Approve The Contract",
              });     
          }
    }
    catch(err){
       return res.status(500).json({error:err.message});
    }
}

/*List Of All Contrct By Buyer*/
exports.getAllContractByBuyer = async (req, res) => {
    try {
      let limit = 8;
      let offset = 0;
      let{buyerId} = req.query;
      let page= req.params.page; 
      Contract.findAndCountAll({where:{buyerId:buyerId}}).then((data) => {
        
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
            "status",
          ],
          order: [["id", "DESC"]],
          where:{buyerId:buyerId},
          limit: limit,
          offset: offset,
        }).then((property) => {
          if (property.length > 0) {
            return res
              .status(200)
              .json({ result: property, count: data.count, pages: pages });
          } else {
            return res.status(404).json({ message: "Data Not Found" });
          }
        });
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };

/*List Of All Contrct By Status Buyer */
exports.getAllContractByBuyerStatus = async (req, res) => {
    try {
      let limit = 8;
      let offset = 0;
      let{buyerId, status} = req.query;
      let page= req.params.page; 
      Contract.findAndCountAll({where:{buyerId:buyerId,status:status}}).then((data) => {
        
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
            "status",
          ],
          order: [["id", "DESC"]],
          where:{buyerId:buyerId,status:status},
          limit: limit,
          offset: offset,
        }).then((property) => {
          if (property.length > 0) {
            return res
              .status(200)
              .json({ result: property, count: data.count, pages: pages });
          } else {
            return res.status(404).json({ message: "Data Not Found" });
          }
        });
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };