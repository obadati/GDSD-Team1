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
    const [results, metadata] = await db.sequelize.query("select T1.rcvId,concat(firstName,concat(' ',lastName)) Name,image ,Max(T1.lastMessage)  from (select case when rcvId=:id then sndId else rcvId end rcvId ,messages.createdAt lastMessage from dev_real_state.messages where sndId=:id or (rcvId=:id  and messageTxt<>'')) T1 left join dev_real_state.users on T1.rcvId=users.id group by T1.rcvId,Name,image   order by Max(T1.lastMessage) desc;",
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
    const [results, metadata] = await db.sequelize.query("select sndId,rcvId,messageTxt,createdAt from dev_real_state.messages where messageTxt <> '' and ((sndId =:sndId and rcvId =:rcvId) or (sndId =:rcvId and rcvId =:sndId)) order by createdAt ",
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
