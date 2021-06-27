'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.company,{foreignKey: 'id' })
    }
  };
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    image: DataTypes.STRING,
    date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};