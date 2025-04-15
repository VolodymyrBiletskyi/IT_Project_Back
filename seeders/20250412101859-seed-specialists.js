module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Delete all existing specialists
    await queryInterface.bulkDelete('specialists', null, {});

    // Insert new specialists without specifying IDs
    const specialists = [
      {
        name: 'Dr. Olivia Brooks',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. David Harrison',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dr. Michael Reynolds',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('specialists', specialists);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('specialists', null, {});
  },
};