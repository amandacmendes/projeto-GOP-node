'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resource_operation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      resource_id: {
        type: Sequelize.INTEGER,
        references: { model: 'resource', key: 'id' },
        primaryKey: true
      },
      operation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operation', key: 'id' },
        primaryKey: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resource_operation');
  }
};