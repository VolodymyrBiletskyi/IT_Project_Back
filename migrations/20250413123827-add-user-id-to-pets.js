'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('pets', 'owner_id', {
      type: Sequelize.UUID,
      allowNull: true, // Allow NULL values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('pets', 'owner_id', {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};