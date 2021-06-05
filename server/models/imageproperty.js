'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imageProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  imageProperty.init({
    image: DataTypes.STRING,
    propertyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'imageProperty',
  });
  return imageProperty;
};