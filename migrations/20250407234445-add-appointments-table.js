'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
      },
      pet_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'pets',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      service_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'services',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Confirmed', 'Canceled'),
        defaultValue: 'Pending',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Add a unique constraint on (date, service_id, time)
    await queryInterface.addIndex('appointments', ['date', 'service_id', 'time'], { unique: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('appointments', ['date', 'service_id', 'time']);
    await queryInterface.dropTable('appointments');
  },
};