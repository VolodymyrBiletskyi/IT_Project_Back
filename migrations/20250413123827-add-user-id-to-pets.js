'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Step 1: Check if the user_id column already exists
    const tableInfo = await queryInterface.describeTable('pets');
    if (!tableInfo.user_id) {
      // Step 2: Add the user_id column if it does not exist
      await queryInterface.addColumn('pets', 'user_id', {
        type: Sequelize.UUID,
        allowNull: true, // Temporarily allow NULL values
      });
    }

    // Step 3: Populate the user_id column for existing rows
    await queryInterface.sequelize.query(`
        UPDATE pets
        SET user_id = 'eaa7d708-7022-4536-9d01-31d7e1865e83' -- Replace with a valid user ID
        WHERE user_id IS NULL;
    `);

    // Step 4: Enforce the NOT NULL constraint
    await queryInterface.changeColumn('pets', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false, // Enforce NOT NULL constraint
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the user_id column if the migration is rolled back
    await queryInterface.removeColumn('pets', 'user_id');
  },
};