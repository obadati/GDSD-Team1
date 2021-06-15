const db = require("../../models");
const Company = db.company;
const Property = db.propertyDetail;
const User = db.user;
var multer = require("multer");
var path = require("path");
const fs = require("fs");
const status= "Approved";

/****************************************************Define Controller***********************************/

/*Image Storage */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assests/uploads/company");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname).toLocaleLowerCase()
    );
  },
});

/*Upload Parameter */
var upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname).toLocaleLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(new Error("Only png, jpg, jpeg images are allowed"));
    }
    callback(null, true);
  },
}).single("logo");

/******************************************************Admin Dashboard***********************************/

/*Create Company */
exports.createCompany = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({
          message:
            err.message == "File too large"
              ? err.message + " the maximum is 2 Mb"
              : err.message,
        });
      } else {
        let data = {
          name: req.body.name,
          registrationNumber: req.body.registrationNumber,
          logo: req.file.path,
        };
        console.log(data);
        await Company.create(data);
        return res
          .status(200)
          .json({ messages: "Company Created Successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Get All Company */
exports.getAllCompanies = (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    Company.findAndCountAll().then((data) => {
      let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Company.findAll({
        attributes: ["id", "name", "registrationNumber", "logo", "createdAt"],
        order: [["id", "DESC"]],
        limit: limit,
        offset: offset,
      }).then((company) => {
        return res
          .status(200)
          .json({ result: company, count: data.count, pages: pages });
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Delete Company */
exports.deleteCompany = async (req, res) => {
  try {
    const id = req.params.id;

    let company = await Company.findOne({ where: { id: id } });
    if (company == null) {
      return res.status(400).json({ message: "Company Not Found" });
    }
    await Company.destroy({
      where: { id: id },
    });
    await fs.unlink(company.logo, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.status(200).json({
      message: "Company Delete Successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Update Company */
exports.updateCompany = async (req, res) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message:
            err.message == "File too large"
              ? err.message + " the maximum is 2 Mb"
              : err.message,
        });
      } else {
        const { name, registrationNumber } = req.body;
        const id = req.params.id;
        let path = req.file.path;
        let companyUpdate = await Company.findOne({
          where: { id: id },
        });
        await Company.update(
          {
            logo: path,
            name: name,
            registrationNumber: registrationNumber,
          },
          { where: { id: id } }
        );
        await fs.unlink(companyUpdate.logo, (err) => {
          if (err) {
            console.log(err);
          }
        });
        return res.status(200).json({
          message: "Company Update Successfully",
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/******************************************************Website User***********************************/
exports.getListOfAgent =async(req,res)=>{
  try {
    let limit = 8;
    let offset = 0;
    const{companyId} = req.query;
    User.findAndCountAll({where:{companyId:companyId}}).then((data) => {
      let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      User.findAll({
        attributes: ["id", "firstName", "lastName", "image", "companyId"],
        order: [["id", "DESC"]],
        where:{companyId:companyId},
        limit: limit,
        offset: offset,
      }).then((company) => {
        if(company.length > 0){
          return res
          .status(200)
          .json({ result: company, count: data.count, pages: pages });  
        }
        else{
          return res
          .status(404)
          .json({ message:"No Data Found" });
        }
        
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}

/*Agent List of Property */
exports.agentProperty = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    const { agentId } = req.query;
    Property.findAndCountAll({ where: { agentId: agentId,status:status } }).then((data) => {
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
          "agentId",
          "createdAt",
          "categoryId",
          "status",
        ],
        order: [["id", "DESC"]],
        include: {
          model: db.category,
          attributes: ["id", "name"],
        },
        where: { agentId: agentId,status:status },
        limit: limit,
        offset: offset,
      }).then((property) => {
        if(property.length > 0){
          return res.status(200).json({
            result: property,
            count: data.count,
            pages: pages,
          });  
        }
        else{
          return res.status(200).json({
            message:"No Data Found"
          });
        }
        
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};