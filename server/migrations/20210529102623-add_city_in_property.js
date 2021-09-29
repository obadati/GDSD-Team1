module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'propertyDetails', // table name
        'city', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
     
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('propertyDetails', 'city'),
    ]);
  },
};