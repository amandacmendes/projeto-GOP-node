'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return Promise.all([
      queryInterface.addColumn(
        'operation', // table name
        'operation_results_seizures', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      )
    ]);

  }

};
