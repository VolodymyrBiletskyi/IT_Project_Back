'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('medical_records', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
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
      medical_information: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {},
      },
      allergies: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      previous_diagnoses: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
      },
      prescriptions: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: [],
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('medical_records');
  },
};