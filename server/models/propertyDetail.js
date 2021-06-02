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
      propertyDetail.hasMany(models.imageProperty, { foreignKey: 'propertyId' });
      propertyDetail.belongsTo(models.user,{foreignKey: 'agentId' });
    }
  };
  propertyDetail.init({
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    location: DataTypes.STRING,
    city:DataTypes.STRING,
    room: DataTypes.STRING,
    size: DataTypes.STRING,
    images: DataTypes.STRING,
    status: DataTypes.STRING,
    agentId: DataTypes.INTEGER,
    date:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'propertyDetail',
  });
  return propertyDetail;
};