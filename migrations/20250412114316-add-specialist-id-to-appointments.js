'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('appointments', 'specialist_id', {
      type: Sequelize.UUID,
      allowNull: true, // Allow NULL values initially
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('appointments', 'specialist_id');
  },
};