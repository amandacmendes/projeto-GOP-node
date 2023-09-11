'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reason', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      reasontype_id: {
        type: Sequelize.INTEGER,
        references: {model: 'reasontype', key: 'id'}
      },
      operation_id: {
        type: Sequelize.INTEGER,
        references: {model: 'operation', key: 'id'}
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reason');
  }
};