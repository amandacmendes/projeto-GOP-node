'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resource', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      resourcetype_id: {
        type: Sequelize.INTEGER,
        references: {model: 'resourcetype',  key: 'id'}
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('resource');
  }
};