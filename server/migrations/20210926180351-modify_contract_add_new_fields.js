'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     queryInterface.addColumn(
      'contracts', // table name
      'seller', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'contracts',
      'buyer',
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.removeColumn('contracts', 'agent'),
      queryInterface.removeColumn('contracts', 'buyer')
      
  }
};
