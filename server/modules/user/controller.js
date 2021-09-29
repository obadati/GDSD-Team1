const db = require("../../models");
const User = db.user;
const Admin = db.admin;
var multer = require("multer");
const date = require("../../utils/date");
var path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../utils/token").tokenEncryptionSecret;
const user = require("../../models/user");
const Approved = "approved";
const Pending = "pending";
const Agent = "agent";
const Buyer = "buyer";
/****************************************************Define Controller***********************************/

/*Image Storage */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assests/uploads/userImage/");
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
      console.log("erro");
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("image");

/*Create User */
exports.create = async (req, res) => {
  try {
    let { firstName, lastName, email, password, companyId, role } =
      req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: "Field empty" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password need to be atleast 5 characters" });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser != null) {
      return res
        .status(400)
        .json({ message: "Account with this email is already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    if (companyId == 0) {
      let userData = {
        firstName,
        lastName,
        image: "assests/uploads/avatar/avatar.png",
        email,
        password: passwordHash,
        role,
        companyId: 0,
        status: "pending",
        rating: 0.0,
        date: date,
      };
      await User.create(userData);
      
      if (role === Buyer) {
        const user = await User.findOne({
          where: { email: userData.email, role: Buyer },
        });
  
        if (!user) {
          return res.status(400).json({
            message: "No account with this email has been registered.",
          });
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid creadentials." });
        }
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role, url:user.image },
          secret
        );
       return res.json({
          token,
          id: user.id,
          email: user.email,
          role: "buyer",
          url:user.image
        });
      }
     // return res.status(200).json(user);
    } 
    else {
      let user = {
        firstName,
        lastName,
        image: "assests/uploads/avatar/avatar.png",
        email,
        password: passwordHash,
        role,
        companyId,
        status: "pending",
        rating: 0.0,
        date: date,
      };
      await User.create(user);
       if (role === Agent) {
      return res.status(200).json({message:"Waiting For Admin Approval"});  
      }
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/*Login User */
exports.login = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (role === "admin") {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Not all fields have been entered." });
      }

      const admin = await Admin.findOne({ username: username });

      if (admin.username != username) {
        return res
          .status(400)
          .json({ message: "No account with this username has been registered." });
      }

      const isMatch = await bcrypt.compareSync(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid creadentials." });
      }

      const token = jwt.sign(
        { id: admin.id, username: admin.username, role: "admin"},
        secret
      );

      res.json({
        token,
        adminId: admin.id,
        username: admin.username,
        role: "admin",
      });
    }
    else if (role === Agent) {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Not all fields have been entered." });
      }
      const userPending = await User.findOne({
        where: { email: username, status: Pending, role: Agent },
      });
      /*Agent Login */
      const user = await User.findOne({
        where: { email: username, status: Approved, role: Agent },
      });
      if (userPending) {
        return res.status(400).json({
          message: "Your account is not approved by the admin yet!",
        });
      }
      if (!user) {
        return res
          .status(400)
          .json({ message: "No account with this email has been registered." });
      }
      if (user) {
        if (!user) {
          return res
            .status(400)
            .json({ message: "No account with this email has been registered." });
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid creadentials." });
        }
        const token = jwt.sign(
          { id: user.id, email: user.username, role: user.role, url:user.image },
          secret
        );
        res.json({
          token,
          id: user.id,
          email: user.email,
          role: "agent",
          url:user.image
        });
      } else if (userPending) {
        return res.status(400).json({
          message: "Your account is not approved by the admin yet!",
        });
      }
    } else if (role === Buyer) {
      const user = await User.findOne({
        where: { email: username, role: Buyer },
      });

      if (!user) {
        return res.status(400).json({
          message: "No account with this email has been registered.",
        });
      }
      const isMatch = await bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid creadentials." });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, url:user.image },
        secret
      );
      res.json({
        token,
        id: user.id,
        email: user.email,
        role: "buyer",
        url:user.image
      });
    } else {
      return res.status(400).json({ message: "Please select correct role" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/*User Image*/
exports.image = async (req, res) => {
  try {
    const id = req.params.userId;
    let image = await User.findOne({
      where: { id: id },
      attributes: ["id", "firstName","lastName","image", "rating"],
      include: {
        model: db.company,
        attributes: ['id', 'name'],
    },
    });
    if (!image) {
      return res
        .status(404)
        .json({ message: "Image not found for this user." });
    } else {
      return res.status(200).json(image);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*Update Image */
exports.updateImage = async (req, res) => {
  try {
    const id = req.params.id;
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({
          message:
            err.message == "File too large"
              ? err.message + " the maximum is 2 Mb"
              : err.message,
        });
      } else {
        const imageUrl = "/assests/uploads/avatar/avatar.png";
        let path = req.file.path;
        let userImage = await User.findOne({
          where: { id: id, image: imageUrl },
        });
        if (userImage) {
          await User.update({ image: path }, { where: { id: id } });
          return res.status(200).json({ message: "Image Upload Successfully" });
        } else {
          let userImage = await User.findOne({ where: { id: id } });
          await User.update({ image: path }, { where: { id: id } });
          await fs.unlink(userImage.image, (err) => {
            if (err) {
              console.log(err);
            }
          });
          return res.status(200).json({
            message: "Image Update Successfully",
          });
        }
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/*Delete User By Admin */
exports.deleteUser = async (req, res) => {
  try {
      const id = req.params.id;
      let user = await User.findOne({ where: { id: id } });
     
      if (user != null) {
          await User.destroy({
              where: { id: id },
          });
        
          await fs.unlink(user.image, (err) => {
              if (err) {
                  console.log(err);
              }
          });
          return res.status(200).json({
              message: 'User Delete Successfully',
          });
      } else {
          return res.status(404).json({ message: 'Data Not Found' });
      }
  } catch (err) {
      return res.status(500).json({ error: err.message });
  }
};
