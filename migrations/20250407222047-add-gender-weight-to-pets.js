"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("pets", "gender", {
      type: Sequelize.ENUM("male", "female"),
      allowNull: true, // allow null initially for backward compatibility
    });

    await queryInterface.addColumn("pets", "weight", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("pets", "gender");
    await queryInterface.removeColumn("pets", "weight");

    // Remove ENUM type from Postgres if used
    if (queryInterface.sequelize.options.dialect === "postgres") {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_pets_gender";');
    }
  },
};
