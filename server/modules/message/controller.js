const db = require("../../models");
const Message = db.message;
const User = db.user;
var multer = require("multer");
/****************************************************Define Controller***********************************/
var upload = multer({
  fileFilter: function (req, file, callback) {
    callback(null, true);
  },
}).single("logo");


/*Create Conversation */
exports.createConversation = async (req, res) => {

  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        let data = {
          sndId: req.body.sndId,
          rcvId: req.body.rcvId,
        };
        console.log(data);
        await Message.create(data);
        return res
          .status(200)
          .json({ messages: "Conversation Created Successfully", });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*get Conversation */

exports.getuserConversations = async (req, res) => {
  try {
    let id = req.params.userId;
    const [results, metadata] = await db.sequelize.query("select rcvId,concat(firstName,concat(' ',lastName)) Name,max(messages.createdAt) lastMessage from test_db.messages  left join users on rcvid=users.id  where sndId=:id group by rcvid order by max(messages.createdAt) desc",
      {
        replacements: { id: id }
      });
    if (results != null) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ results: "Data Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.results });
  }
};

//send Message
exports.sendMessage = async (req, res) => {

  try {
    upload(req, res, async function (err) {
      if (err) {
        res.status(400).json({
          message: err.message,
        });
      } else {
        let data = {
          sndId: req.body.sndId,
          rcvId: req.body.rcvId,
          messageTxt: req.body.messageTxt
        };
        console.log(data);
        const meesage = await Message.create(data);
        return res
          .status(200)
          .json(meesage);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { withUser } = req.query;
    let id = req.params.userId;
    console.log(withUser, id)
    const [results, metadata] = await db.sequelize.query("select sndId,rcvId,messageTxt,createdAt from messages where messageTxt <> '' and ((sndId =:sndId and rcvId =:rcvId) or (sndId =:rcvId and rcvId =:sndId)) order by createdAt ",
      {
        replacements: { sndId: id, rcvId: withUser }
      });
    if (results != null) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ results: "Data Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.results });
  }
};
/******************************************************Admin Dashboard***********************************/

/*Create Company */
