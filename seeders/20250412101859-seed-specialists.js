
'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const specialists = [
      {
        id: 'ac87a42e-47f7-46c5-bf51-2d1992694d06',
        name: 'Dr. Olivia Brooks',
        email: 'dr.olivia@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'add09c39-ead2-4fa3-9835-d4b1a8a70370',
        name: 'Dr. David Harrison',
        email: 'dr.david@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cbffd235-9fa8-494f-8440-46a816317643',
        name: 'Dr. Michael Reynolds',
        email: 'dr.michael@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'doctor',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('specialists', specialists, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('specialists', null, {});
  },
};
