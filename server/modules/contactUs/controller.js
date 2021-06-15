const db = require("../../models");
const ContactUs = db.contactUs;

/*Create Queries*/
exports.createQueries = async(req,res)=>{
    try{
        let data = {
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            description: req.body.description
          };
          await ContactUs.create(data);
          return res.status(200).json({ messages: "Query Send Successfully" });
    }
    catch(err){
      return  res.status(500).json({ error: err.message });
    }
}
/*Get Queries*/
exports.getQueries = async(req,res)=>{
    try {
        let limit = 15;
        let offset = 0;
        ContactUs.findAndCountAll({ }).then((data) => {
          let page = req.params.page; // page number
          let pages = Math.ceil(data.count / limit);
          offset = limit * (page - 1);
    
          ContactUs.findAll({
            order: [["id", "DESC"]],
            limit: limit,
            offset: offset,
          }).then((contactUs) => {
            return res
              .status(200)
              .json({ result: contactUs, count: data.count, pages: pages });
          });
        });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
     
}
/*Delete Queries */
exports.deleteQueries = async (req, res) => {
    try {
      const id = req.params.id;
  
      await ContactUs.destroy({
        where: { id: id },
      });
  
      return res.status(200).json({
        message: "Queries Delete Successfully",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };