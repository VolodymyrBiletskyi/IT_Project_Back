'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('appointments', 'pet_id', {
      type: Sequelize.UUID,
      allowNull: true, // Allow NULL values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('appointments', 'pet_id', {
      type: Sequelize.UUID,
      allowNull: false, // Revert to NOT NULL
    });
  },
};