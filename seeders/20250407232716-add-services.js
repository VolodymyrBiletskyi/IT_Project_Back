'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const services = [
      {
        id: '4bfce486-6dfa-4208-9c07-2cda20baaed9', // Optional: Provide UUIDs if needed
        name: 'General Check-ups',
        description: 'Comprehensive health assessments for pets.',
        image_url: '/images/general-checkups.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        name: 'Vaccinations',
        description: 'Protect your pet from common diseases.',
        image_url: '/images/vaccinations.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
        name: 'Dental Care',
        description: 'Maintain your pet’s oral health.',
        image_url: '/images/dental-care.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'd9c5e6a7-8b7c-4def-8b7c-d9c5e6a78b7c',
        name: 'Grooming',
        description: 'Professional grooming services for pets.',
        image_url: '/images/grooming.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e8d7c6b5-a9f8-4cde-a9f8-e8d7c6b5a9f8',
        name: 'Laboratory Tests',
        description: 'Diagnostic tests for accurate health assessments.',
        image_url: '/images/laboratory-tests.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'f7e6d5c4-b3a2-4cde-b3a2-f7e6d5c4b3a2',
        name: 'Nutritional Counseling',
        description: 'Expert advice on pet nutrition.',
        image_url: '/images/nutritional-counseling.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('services', services);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('services', null, {});
  },
};