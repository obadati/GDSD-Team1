const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const admin = require('./modules/admin/route');
const property = require('./modules/propertyDetails/route');
const category = require('./modules/category/route');
const user = require('./modules/user/route');
const port = 5000;

/*Server Image Path Through Server */
app.use('/', express.static(__dirname + '/public/'));
app.use('/assests/uploads/propertyImage/', express.static(__dirname + '/assests/uploads/propertyImage/'));
app.use('/assests/uploads/avatar/', express.static(__dirname + '/assests/uploads/avatar/'));
app.use('/assests/uploads/userImage/', express.static(__dirname + '/assests/uploads/userImage/'));
app.use(express.json());

/*Access For Frontend To Consume Backend Server*/
app.use(cors());

/*Register Route For End Points*/
app.use('/api/categories', category);
app.use('/api/properties', property);
app.use('/api/admin', admin);
app.use('/api/user', user);

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
db.sequelize.sync().then((req)=>{
  app.listen(port, () => {
    console.log(`Real-Estate-App is listening at http://localhost:${port}`)
  })
})

/*Export*/
module.exports = app;