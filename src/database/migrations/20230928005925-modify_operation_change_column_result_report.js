'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return Promise.all([
      queryInterface.changeColumn(
        'operation', // table name
        'operation_results_report', // field name
        {
          type: Sequelize.STRING(5000)
        },
      )
    ]);

  },

};
