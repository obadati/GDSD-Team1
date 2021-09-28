const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const fs = require('fs');
const https = require('https');
const admin = require('./modules/admin/route');
const property = require('./modules/propertyDetails/route');
const company = require('./modules/company/route');
const category = require('./modules/category/route');
const message = require('./modules/message/route');
const user = require('./modules/user/route');
const contactUs = require('./modules/contactUs/route');
const contract = require('./modules/contract/route');
const port = 5000;
const privateKey = fs.readFileSync('/etc/letsencrypt/live/homeforme-aws.de/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/homeforme-aws.de/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

/*Server Image Path Through Server */
app.use('/', express.static(__dirname + '/public/'));
app.use('/assests/uploads/propertyImage/', express.static(__dirname + '/assests/uploads/propertyImage/'));
app.use('/assests/uploads/avatar/', express.static(__dirname + '/assests/uploads/avatar/'));
app.use('/assests/uploads/userImage/', express.static(__dirname + '/assests/uploads/userImage/'));
app.use('/assests/uploads/company/', express.static(__dirname + '/assests/uploads/company/'));
app.use(express.json());

/*Access For Frontend To Consume Backend Server*/
app.use(cors());
// app.use(auth);


/*Register Route For End Points*/
app.use('/api/categories', category);
app.use('/api/properties', property);
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/company', company);
app.use('/api/message', message);
app.use('/api/contactUs', contactUs);
app.use('/api/contract/', contract);


/*Error  Handling*/
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

/*Intialize the Sequalize*/
db.sequelize.sync().then((req) => {
  /* app.listen(port, () => {     for local run*/
  httpsServer.listen(port, () => {
    console.log(`Real-Estate-App is listening at http://localhost:${port}`)
  })
})

/*Export*/
module.exports = app;