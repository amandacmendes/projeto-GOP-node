'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('operation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      operation_name: {
        type: Sequelize.STRING
      },
      operation_place: {
        type: Sequelize.STRING
      },
      operation_planned_date: {
        type: Sequelize.DATE
      },
      operation_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      operation_results_deaths: {
        type: Sequelize.INTEGER
      },
      operation_results_arrests: {
        type: Sequelize.INTEGER
      },
      operation_results_report: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('operation');
  }
};