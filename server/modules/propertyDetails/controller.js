const db = require("../../models");
const Property = db.propertyDetail;
const PropertyImage = db.imageProperty;
const User = db.user;
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

/***********************************************Agent Dashboard******************************************/
/*Create Property By Agent*/
exports.create = async (req, res) => {
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
          title: req.body.title,
          description: req.body.description,
          categoryId: req.body.categoryId,
          price: req.body.price,
          location: req.body.location,
          status: "pending",
          room: req.body.room,
          size: req.body.size,
          images: req.file.path,
          city: req.body.city,
          agentId: req.body.agentId,
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
    return res.status(500).json({ error: err.message });
  }
};

/*Add Property Images in Property By Agent*/
exports.addPropertyImage = async (req, res) => {
  try {
    uploadMultipleImage(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message:
            err.message == "File too large"
              ? err.message + " the maximum is 2 Mb"
              : err.message,
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
    return res.status(500).json({ error: err.message });
  }
};

/*Agent List of Property */
exports.agentProperty = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    const { agentId } = req.query;
    let agent = await User.findOne({
      attributes: ["id", "firstName", "lastName", "rating", "image"],
      where: { id: agentId },
    });
    console.log(agent);
    Property.findAndCountAll({ where: { agentId: agentId } }).then((data) => {
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
        where: { agentId: agentId },
        limit: limit,
        offset: offset,
      }).then((property) => {
        return res.status(200).json({
          user: agent,
          result: property,
          count: data.count,
          pages: pages,
        });
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/*Agent List of Property By Status */
exports.agentPropertyByStatus = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    const { agentId, status } = req.query;
    let agent = await User.findOne({
      attributes: ["id", "firstName", "lastName", "rating", "image"],
      where: { id: agentId },
    });
    console.log(agent);
    Property.findAndCountAll({
      where: { agentId: agentId, status: status },
    }).then((data) => {
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
        where: { agentId: agentId, status: status },
        limit: limit,
        offset: offset,
      }).then((property) => {
        return res.status(200).json({
          user: agent,
          result: property,
          count: data.count,
          pages: pages,
        });
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/*Update Property */
exports.updateProperty = async (req, res) => {
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
        const {
          title,
          categoryId,
          description,
          price,
          location,
          room,
          size,
          city,
        } = req.body;
        const id = req.params.id;
        let path = req.file.path;
        let propertyUpdate = await Property.findOne({
          where: { id: id },
        });
        await Property.update(
          {
            images: path,
            title: title,
            categoryId: categoryId,
            price: price,
            location: location,
            room: room,
            size: size,
            description: description,
            city: city,
          },
          { where: { id: id } }
        );
        console.log(propertyUpdate.images);
        await fs.unlink(propertyUpdate.images, (err) => {
          if (err) {
            console.log(err);
          }
        });
        return res.status(200).json({
          message: "Image Update Successfully",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/*********************************************************Website User*********************************/

/*Get All Property Approved By Admin*/
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
    return res.status(500).json({ error: err.message });
  }
};

/*Get Approved Property By Category Id By User*/
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
    return res.status(500).json({ error: err.message });
  }
};

/*Search Property Text By User*/
exports.searchPropertyByText = (req, res) => {
  try {
    let { query, page } = req.query;
    query = query.toLowerCase();
    let limit = 8;
    let offset = 0;
    Property.findAndCountAll({
      where: { title: { [Op.like]: "%" + query + "%" }, status: status },
    }).then((data) => {
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      Property.findAll({
        where: { title: { [Op.like]: "%" + query + "%" }, status: status },
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
    return res.status(500).json({ error: err.message });
  }
};

/*Get Property By Id User*/
exports.getPropertyById = async (req, res) => {
  try {
    let id = req.params.id;
    let propertyDetail = await Property.findOne({
      where: { id: id },
      include: {
        model: db.imageProperty,
        attributes: ["id", "image", "propertyId"],
      },
    });
    if (propertyDetail != null) {
      return res.status(200).json(propertyDetail);
    } else {
      return res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.findAvgPrice = async (req, res) => {
  try {
    let { city, categoryId, room, size } = req.query;
    let property = await Property.findAll({
      where: {
        city: city,
        categoryId: categoryId,
        room: room,
        size: size,
      },
      attributes: ["id", "price"],
    });
    if (property.length > 0) {
      let sum = property.reduce(function (tot, arr) {
        // return the sum with previous value
        return tot + parseFloat(arr.price);
        // set initial value as 0
      }, 0);

      let avgPrice = Math.round(sum / property.length);
      console.log(avgPrice);
      return res.json({
        sumofProperty: sum,
        totalProperty: property.length,
        avgPrice: avgPrice,
      });
    } else {
      if (city == "Berlin" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 450,
        });
      }
      if (city == "Berlin" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 10500,
        });
      }
      if (city == "Berlin" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 6000,
        });
      }
      if (city == "Munich" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 420,
        });
      }
      if (city == "Munich" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 9650,
        });
      }
      if (city == "Munich" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 5600,
        });
      }
      if (city == "Frankfurt" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 400,
        });
      }
      if (city == "Frankfurt" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 7450,
        });
      }
      if (city == "Frankfurt" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 12050,
        });
      }
      if (city == "Hamburg" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 390,
        });
      }
      if (city == "Hamburg" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 6450,
        });
      }
      if (city == "Hamburg" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 9050,
        });
      }
      if (city == "Cologne" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 370,
        });
      }
      if (city == "Cologne" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 6050,
        });
      }
      if (city == "Cologne" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 12000,
        });
      }
      if (city == "Heidelberg" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 350,
        });
      }
      if (city == "Heidelberg" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 5050,
        });
      }
      if (city == "Heidelberg" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 9067,
        });
      }
      if (city == "Stuttgart" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 450,
        });
      }
      if (city == "Stuttgart" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 290,
        });
      }
      if (city == "Stuttgart" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 8950,
        });
      }
      if (city == "Dresden" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 260,
        });
      }
      if (city == "Dresden" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 4898,
        });
      }
      if (city == "Dresden" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 8999,
        });
      }
      if (city == "Fulda" && categoryId == 1) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 250,
        });
      }
      if (city == "Fulda" && categoryId == 2) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 4050,
        });
      }
      if (city == "Fulda" && categoryId == 3) {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 1030,
        });
      } else {
        return res.json({
          sumofProperty: 0,
          totalProperty: 0,
          avgPrice: 0,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/******************************************************Admin Dashboard***********************************/

/*List Of All Property By Admin */
exports.getAllPropertyByAdmin = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    Property.findAndCountAll({}).then((data) => {
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

/*List Of All Property By Admin Status */
exports.getAllPropertyByAdminStatus = async (req, res) => {
  try {
    let limit = 8;
    let offset = 0;
    let { status } = req.query;
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
        where: { status: status },
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

/*Delete Property By Admin or Agent */
exports.deleteProperty = async (req, res) => {
  try {
    const id = req.params.id;
    let property = await Property.findOne({ where: { id: id } });
    let propertyImage = await PropertyImage.findAll({
      where: { propertyId: id },
    });
    if (property != null) {
      await Property.destroy({
        where: { id: id },
      });
      await PropertyImage.destroy({
        where: { propertyId: id },
      });
      propertyImage.map((i) => {
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
    } else {
      return res.status(404).json({ message: "Data Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
