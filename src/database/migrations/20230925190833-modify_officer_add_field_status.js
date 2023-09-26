'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    return Promise.all([
      queryInterface.addColumn(
        'officer', // table name
        'status', // new field name
        {
          type: Sequelize.STRING(15),
          allowNull: false,
          defaultValue: 'ACTIVE'
        },
      )
    ]);
  },

};
