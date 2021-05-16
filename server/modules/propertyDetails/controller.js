const db = require("../../models");
const Property = db.propertyDetail;
var multer = require("multer");
const date = require("../../utils/date");
const time = require("../../utils/time");
var path = require("path");
const fs = require("fs");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assests/uploads/propertyImage");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("property");

/*Create Property*/
exports.create = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({
          message: err.message + " maximum 2mb",
        });
      } else {
        let data = {
          title: req.body.title,
          description: req.body.description,
          categoryId: req.body.categoryId,
          price: req.body.price,
          location: req.body.location,
          images: req.file.path,
          createdAt: date + " " + time,
          updatedAt: date + " " + time,
        };
        console.log(data);
        await Property.create(data);
        return res
          .status(200)
          .json({ messages: "Property Created Successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/*Get All Property */
exports.getAllProperty = async (req, res) => {
  try {
    let property = await Property.findAll({
      attributes:['id','title','description','price','location','images','createdAt','categoryId'],
      order: [["id", "DESC"]],
      include: {
        model:db.category,
        attributes:['id','name']
       }
    });
    return res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/*Get Property By  Category Id*/
exports.propertyByCategoryId = async (req, res) => {
  try {
    const id = req.params.id;
    
    let property = await Property.findAll({
      attributes:['id','title','description','price','location','images','createdAt','categoryId'],
      where: { categoryId: id },
      order: [["id", "DESC"]],
      include: {
        model:db.category,
        attributes:['id','name']
       }
    });

    return res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/*Search Property By Text */
exports.searchPropertyByText = async (req, res) => {
    try {
      let {search} = req.query;
      search = search.toLowerCase();
      console.log(search)
      let property = await Property.findAll({
      where:{ title: { [Op.like]: '%' + search + '%'}},
       // where:{title:text},
        attributes:['id','title','description','price','location','images','createdAt','categoryId'],
        order: [["id", "DESC"]],
        include: {
          model:db.category,
          attributes:['id','name']
         }
      });
      return res.status(200).json(property);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
/*Delete Property */
exports.deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;

    await Property.destroy({
      where: { id: id },
    });

    return res.status(200).json({
      message: "Property Delete Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
