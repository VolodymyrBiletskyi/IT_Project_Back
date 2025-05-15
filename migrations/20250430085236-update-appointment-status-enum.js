'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const enumName = 'enum_appointments_status';


    const valuesToAdd = ['on time', 'completed', 'cancelled', 'delayed', 'no show'];


    for (const value of valuesToAdd) {
      try {

        await queryInterface.sequelize.query(`ALTER TYPE "${enumName}" ADD VALUE IF NOT EXISTS '${value}';`);
        console.log(`Ensured value '${value}' exists in ENUM ${enumName}`);
      } catch (e) {

        if (e.original && e.original.code === '42710') {
          console.log(`Value '${value}' already exists in ENUM ${enumName}, skipping.`);
        } else if (e.message.includes("cannot run inside a transaction block")) {
          // ALTER TYPE ... ADD VALUE might need to run outside a transaction in some PG versions
          console.warn(`Could not add value '${value}' inside transaction. Consider running migrations without transactions for this step if needed.`);
          throw e; // Re-throw to potentially halt the migration
        }
        else {
          console.error(`Error adding value '${value}' to ENUM ${enumName}:`, e);
          throw e; // Re-throw other errors to halt the migration
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {

    console.log('Rolling back this migration does not remove the added ENUM values.');
    console.log('Values added: on time, completed, cancelled, delayed, no show');

    return Promise.resolve(); // Indicate successful (noop) rollback
  }
};