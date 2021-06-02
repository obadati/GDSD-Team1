const db = require("../../models");
const Property = db.propertyDetail;
const PropertyImage = db.imageProperty;
var multer = require("multer");
const date = require("../../utils/date");
var path = require("path");
const fs = require("fs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const status = "Approved";

/****************************************************Define Controller***********************************/

/*Image Storage */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assests/uploads/propertyImage/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

/*Upload Parameter */
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

/*Upload Parameter For Multiple Image */
var uploadMultipleImage = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).array("property", 10);

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
          status: "Pending",
          room: req.body.room,
          size: req.body.size,
          images: req.file.path,
          city:req.body.city,
          agentId:req.body.agentId,
          date: date,
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
exports.getAllProperty = (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    Property.findAndCountAll({ where: { status: status } }).then((data) => {
      let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Property.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "price",
          "room",
          "size",
          "location",
          "city",
          "images",
          "createdAt",
          "categoryId",
          "status",
        ],
        order: [["id", "DESC"]],
        include: {
          model: db.category,
          attributes: ["id", "name"],
        },
        limit: limit,
        offset: offset,
        where: { status: status },
      }).then((property) => {
        return res
          .status(200)
          .json({ result: property, count: data.count, pages: pages });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/*Get Property By  Category Id*/
exports.propertyByCategoryId = (req, res) => {
  try {
    let page = req.params.page;
    const { categoryId } = req.query;
    let limit = 8;
    let offset = 0;
    Property.findAndCountAll({
      where: { categoryId: categoryId, status: status },
    }).then((data) => {
      // let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Property.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "price",
          "room",
          "size",
          "location",
          "city",
          "images",
          "createdAt",
          "categoryId",
          "status",
        ],
        where: { categoryId: categoryId, status: status },
        order: [["id", "DESC"]],
        include: {
          model: db.category,
          attributes: ["id", "name"],
        },
        limit: limit,
        offset: offset,
      }).then((property) => {
        return res
          .status(200)
          .json({ result: property, count: data.count, pages: pages });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/*Search Property By Text */
exports.searchPropertyByText = (req, res) => {
  try {
    let { text, page } = req.query;
    text = text.toLowerCase();
    console.log(text);

    let limit = 8;
    let offset = 0;
    Property.findAndCountAll({
      where: { title: { [Op.like]: "%" + text + "%" }, status: status },
    }).then((data) => {
      // let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Property.findAll({
        where: { title: { [Op.like]: "%" + text + "%" }, status: status },
        // where:{title:text},
        attributes: [
          "id",
          "title",
          "description",
          "price",
          "room",
          "size",
          "location",
          "city",
          "images",
          "createdAt",
          "categoryId",
          "status",
        ],
        order: [["id", "DESC"]],
        include: {
          model: db.category,
          attributes: ["id", "name"],
        },
        limit: limit,
        offset: offset,
      }).then((property) => {
        return res
          .status(200)
          .json({ result: property, count: data.count, pages: pages });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/*Delete Property */
exports.deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    let property = await Property.findOne({where:{id:id}});
    let propertyImage = await PropertyImage.findAll({where:{propertyId:id}});
    if(property != null){
      await Property.destroy({
        where: { id: id },
      });
      await PropertyImage.destroy({
        where: { propertyId: id },
      });
     propertyImage.map(i =>{
      fs.unlinkSync(i.image, (err) => {
         if (err) {
           console.log(err);
         }
       });
   });
      await fs.unlink(property.images, (err) => {
        if (err) {
          console.log(err);
        }
      });
      return res.status(200).json({
        message: "Property Delete Successfully",
      });
    }
    else{
      return res.status(404).json({message:"Data Not Found"});
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Add Property Images in Property*/
exports.addPropertyImage = async (req, res) => {
  try {
    uploadMultipleImage(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message: err.message + " maximum 2mb",
        });
      } else {
        sendData();
        async function sendData() {
          var images = req.files;
          for (const filess of images) {
            let data = {
              propertyId: req.body.propertyId,
              image: filess.path,
            };
            await PropertyImage.create(data);
          }
        }
        return res
          .status(200)
          .json({ messages: "Property Created Successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Get Property By Id*/
exports.getPropertyById = async (req, res) => {
  try {
    let id = req.params.id;
    let propertyDetail = await Property.findOne({
      where: { id: id },
      include: [{
        model: db.imageProperty,
        attributes: ["id", "image", "propertyId"],
      },{
        model: db.user,
        attributes: ["id", "image","rating" ],
      }]
    });
    if(propertyDetail != null){
     return res.status(200).json(propertyDetail);
    }
    else{
      return res.status(404).json({message:"Data Not Found"});
    }
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
