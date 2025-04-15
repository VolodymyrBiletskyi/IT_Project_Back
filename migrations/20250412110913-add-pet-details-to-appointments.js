'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add phone_number column
    await queryInterface.addColumn('appointments', 'phone_number', {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'Unknown',
    });

    // Add pet_name column
    await queryInterface.addColumn('appointments', 'pet_name', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Unknown',
    });

    // Add species column
    await queryInterface.addColumn('appointments', 'species', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Unknown',
    });

    // Add breed column
    await queryInterface.addColumn('appointments', 'breed', {
      type: Sequelize.STRING(50),
      allowNull: false,
      defaultValue: 'Unknown',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove phone_number column
    await queryInterface.removeColumn('appointments', 'phone_number');

    // Remove pet_name column
    await queryInterface.removeColumn('appointments', 'pet_name');

    // Remove species column
    await queryInterface.removeColumn('appointments', 'species');

    // Remove breed column
    await queryInterface.removeColumn('appointments', 'breed');
  },
};