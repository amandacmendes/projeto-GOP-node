'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('user', [{
      email: 'admin@admin',
      password: '$2b$10$waHgXbDGX8CSiI1hIzMlDOQhP51MW8eQKVyhQoeuOve38vAhqiA6K',
      status: 'A',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
    await queryInterface.bulkInsert('team', [{
      team_name: 'Equipe 1',
      status: 'A',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkInsert('officer', [{
      name: 'admin',
      team_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    await queryInterface.bulkUpdate('user',
      { officer_id: 1 },
      { id: 1 }
    );

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
