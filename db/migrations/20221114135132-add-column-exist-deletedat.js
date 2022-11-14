'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Users', 'exist', { type: Sequelize.BOOLEAN });
     await queryInterface.addColumn('Users', 'deletedAt', { type: Sequelize.DATE });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Users', 'exist')
    await queryInterface.removeColumn('Users', 'deletedAt')
  }
};
