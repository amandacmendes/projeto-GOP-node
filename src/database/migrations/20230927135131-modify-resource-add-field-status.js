'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.addColumn(
        'resource', // table name
        'status', // new field name
        {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 'ACTIVE'
        },
      )
    ]);

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
