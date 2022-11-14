'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('User', 'exist', { type: Sequelize.BOOLEAN });
     await queryInterface.addColumn('User', 'deletedAt', { type: Sequelize.DATE });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('User', 'exist')
    await queryInterface.removeColumn('User', 'deletedAt')
  }
};
