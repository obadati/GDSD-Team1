const jwt = require("jsonwebtoken");
const secret = require("../utils/token").tokenEncryptionSecret;

const auth = (req, res, next) => {
  try {

    const whitelist= ['/api/user/login',`/api/admin/allAgent/1`,'/api/admin/allAgent/2','/api/admin/agentByStatus/1?status=pending',
  '/api/admin/agentByStatus/1?status=approved','/api/categories'
  ]

    for (i = 0; i < whitelist.length; i++) {
      if (req.url == whitelist[i]) {

          return next();
      }
  }
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, unauthorized denied." });
    }

    const verified = jwt.verify(token, secret);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token Verification failed, unauthorized denied." });
    }

     res.user = verified.id;
    next();
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
