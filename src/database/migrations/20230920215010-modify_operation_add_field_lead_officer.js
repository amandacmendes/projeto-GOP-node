'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.addColumn(
        'operation', // table name
        'lead_officer_id', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'officer', key: 'id' },
        },
      )
    ]);
  },

  async down(queryInterface, Sequelize) {

  }
};
