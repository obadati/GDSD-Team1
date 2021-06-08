const db = require("../../models");
const User = db.user;
var multer = require("multer");
const date = require("../../utils/date");
var path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../utils/token").tokenEncryptionSecret;
const Approved = "Approved";
const Pending = "Pending";
const Agent = "Agent";

/****************************************************Define Controller***********************************/

/*Image Storage */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assests/uploads/userImage/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname).toLocaleLowerCase()
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
    let { firstName, lastName, email, password, companyId, postType } =
      req.body;

    if (!firstName || !lastName || !email || !password || !postType) {
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

    console.log(date);
    if (companyId == undefined) {
      let user = {
        firstName,
        lastName,
        image: "/assests/uploads/avatar/avatar.png",
        email,
        password: passwordHash,
        postType,
        companyId: 0,
        status: "Pending",
        rating: 0.0,
        date: date,
      };
      await User.create(user);
      return res.status(200).json(user);
    } else {
      let user = {
        firstName,
        lastName,
        image: "/assests/uploads/avatar/avatar.png",
        email,
        password: passwordHash,
        postType,
        companyId,
        status: "Pending",
        rating: 0.0,
        date: date,
      };
      await User.create(user);
      return res.status(200).json(user);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/*Login User */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Not all fields have been entered." });
    }
    const userPending = await User.findOne({
      where: { email: email, status: Pending, postType: Agent },
    });
    /*Agent Login */
    const user = await User.findOne({
      where: { email: email, status: Approved, postType: Agent },
    });
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
        { id: user.id, email: user.email, role: user.postType },
        secret
      );
      res.json({
        token,
        id: user.id,
        email: user.email,
      });
    } 
    else if(userPending){
      return res
      .status(400)
      .json({
        message: "Your account is not approved by the admin yet!",
      });
    }
    
    else if (!user) {
      const user = await User.findOne({ where: { email: email } });
      
        if (!user) {
          return res
            .status(400)
            .json({
              message: "No account with this email has been registered.",
            });
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid creadentials." });
        }
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.postType },
          secret
        );
        res.json({
          token,
          id: user.id,
          email: user.email,
        });
      
    } else {
      return res
        .status(400)
        .json({ message: "No account with this email has been registered." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*User Image*/
exports.image = async (req, res) => {
  try {
    const id = req.params.id;
    let image = await User.findOne({
      where: { id: id },
      attributes: ["id", "image","rating"],
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
          console.log("312");
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
