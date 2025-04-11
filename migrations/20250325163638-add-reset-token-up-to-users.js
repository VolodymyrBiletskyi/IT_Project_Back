module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "resetToken", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("users", "resetTokenExpires", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "resetToken");
    await queryInterface.removeColumn("users", "resetTokenExpires");
  },
};
// command to run migration: npx sequelize-cli db:migrate