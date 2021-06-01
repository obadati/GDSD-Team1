const db = require("../../models");
const Admin = db.admin;
const User = db.user;
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

    const existingAdmin = await Admin.findOne({
      where: { username: username },
    });
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
/*Admin Login */
exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    console.log(username);
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
/*List Of Agents */
exports.GetAgent = async (req, res) => {
  try {
    let limit = 20;
    let offset = 0;
    User.findAndCountAll({ where: { postType: "Agent" } }).then((data) => {
      let page = req.params.page; // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);

      User.findAll({
        where: { postType: "Agent" },
        attributes: [
          "id",
          "firstName",
          "lastName",
          "email",
          "postType",
          "status",
          "image",
          "date",
        ],
        order: [["id", "DESC"]],
        limit: limit,
        offset: offset,
      }).then((agent) => {
        return res
          .status(200)
          .json({ result: agent, count: data.count, pages: pages });
      });
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/*List of Agent By Status */
exports.GetAgentStatus = async (req, res) => {
  try {
    let limit = 20;
    let offset = 0;
    const { status } = req.query;
    User.findAndCountAll({ where: { postType: "Agent", status: status } }).then(
      (data) => {
        let page = req.params.page; // page number
        let pages = Math.ceil(data.count / limit);
        offset = limit * (page - 1);

        User.findAll({
          where: { postType: "Agent", status: status },
          attributes: [
            "id",
            "firstName",
            "lastName",
            "email",
            "postType",
            "status",
            "image",
            "date",
          ],
          order: [["id", "DESC"]],
          limit: limit,
          offset: offset,
        }).then((agent) => {
          return res
            .status(200)
            .json({ result: agent, count: data.count, pages: pages });
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
/*Approve Agent*/
exports.ApproveStatus = async (req, res) => {
  try {
    let id = req.params.id;
    const { status } = req.query;
    let user = await User.findOne({ where: { id: id } });
    if (user) {
      await User.update({ status: status }, { where: { id: id } });

      return res.status(200).json({
        message: "Change status successfully",
      });
    } else {
      return res.status(400).json({
        message: "User not found",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
