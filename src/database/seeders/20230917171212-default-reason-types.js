'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('reasontype', [{
      description: 'MANDADO DE BUSCA E APREENSÃO DE BENS'
    }, {
      description: 'MANDADO DE PRISÃO PREVENTIVA'
    }, {
      description: 'MANDADO DE PRISÃO TEMPORÁRIA'
    }, {
      description: 'MANDADO DE CONDUÇÃO COERCITIVA'
    }]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
