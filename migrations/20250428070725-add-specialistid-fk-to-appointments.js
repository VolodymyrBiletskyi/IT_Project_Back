'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('appointments', {
      fields: ['specialist_id'],
      type: 'foreign key',
      name: 'appointments_specialist_id_fkey',
      references: {
        table: 'specialists',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // or 'CASCADE' depending on how you want deletion to behave
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('appointments', 'appointments_specialist_id_fkey');
  },
};
