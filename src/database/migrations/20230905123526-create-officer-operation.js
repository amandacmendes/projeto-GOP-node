'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('officer_operation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      officer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'officer', key: 'id' }
      },
      operation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'operation', key: 'id' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('officer_operation');
  }
};