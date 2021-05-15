const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const db = require('./models');
const property = require('./modules/propertyDetails/route');
const category = require('./modules/category/route');
const port = 5000

app.use(express.json());


app.use('/api/category', category);
app.use('/api/property', property);

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
db.sequelize.sync().then((req)=>{
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
})


module.exports = app;