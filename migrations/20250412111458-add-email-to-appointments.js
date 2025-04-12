'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('appointments', 'email', {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: 'unknown@example.com', // Provide a default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('appointments', 'email');
  },
};