const db = require("../../models");
const Admin = db.admin;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../../utils/token").tokenEncryptionSecret;

exports.create = async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Field Empty" + error.message });
    }

    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password need to be atleast 5 characters" });
    }

    const existingAdmin = await Admin.findOne({ username: username });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ msg: "Account with this username is already exists" });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    console.log(passwordHash);

    let admin = {
      username,
      password: passwordHash,
    };

    await Admin.create(admin);
    return res.status(200).json(admin);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    console.log(username)
    const admin = await Admin.findOne({ username: username });
   
    if (admin.username != username) {
      return res
        .status(400)
        .json({ msg: "No account with this username has been registered." });
    }

    const isMatch = await bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid creadentials." });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: "Admin" },
      secret
    );

    res.json({
      token,
      adminId: admin.id,
      username: admin.username,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
