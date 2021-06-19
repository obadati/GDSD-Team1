'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contract.belongsTo(models.user,{foreignKey: 'buyerId' })

    }
  };
  contract.init({
    propertyId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dateCreate: DataTypes.STRING,
    dateValid: DataTypes.STRING,
    agentId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    buyerId: DataTypes.INTEGER,
    approve: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contract',
  });
  return contract;
};