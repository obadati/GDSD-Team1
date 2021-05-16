'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class propertyDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      propertyDetail.belongsTo(models.category)
    }
  };
  propertyDetail.init({
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    location: DataTypes.STRING,
    images: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'propertyDetail',
  });
  return propertyDetail;
};