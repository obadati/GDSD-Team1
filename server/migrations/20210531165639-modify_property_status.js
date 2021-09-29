module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn(
        'propertyDetails', // table name
        'status', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
     
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.changeColumn('propertyDetails', 'status', {
            type: Sequelize.INTEGER,
            allowNull: true,
        }, {
            transaction,
        })
    ])
}
};