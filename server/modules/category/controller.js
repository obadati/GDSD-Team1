const db = require("../../models");
const Category = db.category;
const Property =db.propertyDetail;
const date = require("../../utils/date");
const time = require("../../utils/time");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const status = "Approved";

/****************************************************Define Controller***********************************/

/*Create Category*/
exports.create = async (req, res) => {
  try {

      let data = {
        name:req.body.name,
      };
      await Category.create(data);
      return res.status(200).json({ messages: "Category Created Successfully" });
} 
  catch (err) {
  return  res.status(500).json({ error: err.message });
  }
};

/*Get All Category */
exports.getAllCategory = async (req, res) => {
  try {
    let category = await Category.findAll({});

    return res.status(200).json({category});
  } catch (err) {
   return res.status(500).json({ error: err.message });
  }
};

/*Get Property By CategoryId & Text */
exports.searchPropertyByCategoryText = async(req,res)=>{
  try{
      const {query}= req.query;
      let properties = await Property.findAll({
        where:{categoryId:req.params.id, title:{ [Op.like]: "%" + query + "%" },status:status }
      });
      if(properties.length==0){
      return  res.status(404).json({message:"Not Found"});
      }
      return res.status(200).json(properties);
  }
  catch(err){
   return res.status(500).json({ error: err.message });
  }
};

/*Delete Property */
exports.deleteCategory = async (req, res) => {
    try {
      const id = req.params.id;
  
      await Category.destroy({
        where: { id: id },
      });
  
      return res.status(200).json({
        message: "Category Delete Successfully",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};