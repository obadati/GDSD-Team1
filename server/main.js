const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const admin = require('./modules/admin/route');
const property = require('./modules/propertyDetails/route');
const category = require('./modules/category/route');
const company = require('./modules/company/route');
const user = require('./modules/user/route');
const port = 5000

app.use('/', express.static(__dirname + '/public/')); // ← adjust
app.use('/assests/uploads/propertyImage/', express.static(__dirname + '/assests/uploads/propertyImage/')); // ← adjust
app.use('/assests/uploads/avatar/', express.static(__dirname + '/assests/uploads/avatar/')); // ← adjust
app.use('/assests/uploads/userImage/', express.static(__dirname + '/assests/uploads/userImage/')); // ← adjust
app.use(express.json());

app.use(cors());
app.use('/api/categories', category);
app.use('/api/properties', property);
app.use('/api/admin', admin);
app.use('/api/user', user);
app.use('/api/company', company);


app.use(cors());
//error  handling
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



// app.use('/property', property);
db.sequelize.sync().then((req) => {


  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})


module.exports = app;