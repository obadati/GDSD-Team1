const db = require("../../models");
const User = db.user;
var multer = require("multer");
const date = require("../../utils/date");
var path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../utils/token").tokenEncryptionSecret;

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
        .json({ msg: "Password need to be atleast 5 characters" });
    }

    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser != null) {
      return res
        .status(400)
        .json({ msg: "Account with this email is already exists" });
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
        companyId:0,
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
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });
    }

    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid creadentials." });
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
