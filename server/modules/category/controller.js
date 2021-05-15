const db = require("../../models");
const Category = db.Category;
const date = require("../../utils/date");
const time = require("../../utils/time");


//Create Property
exports.create = async (req, res) => {
  try {

      let data = {
        category: req.body.category,
        createdAt: date + " " + time,
        updatedAt: date + " " + time,
      };
      await Category.create(data);
      return res.status(200).json({ messages: "Category Created Successfully" });
    
} 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAllCategory = async (req, res) => {
  try {
    let category = await Category.findAll({});

    return res.status(200).json({category});
  } catch (err) {
    res.status(500).json({ error: err.message });
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