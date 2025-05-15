'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('appointments', 'full_name', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Unknown', // Add a default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('appointments', 'full_name');
  },
};