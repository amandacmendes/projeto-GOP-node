'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resource_operation', {

      resource_id: {
        type: Sequelize.INTEGER,
        references: { model: 'resource', key: 'id' }
      },
      operation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operation', key: 'id' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resource_operation');
  }
};