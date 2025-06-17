'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Deleting old if exists
    await queryInterface.removeColumn('pets', 'photo_url');

    // adding new column 'photo' type BLOB
    await queryInterface.addColumn('pets', 'photo', {
      type: Sequelize.BLOB('long'),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('pets', 'photo');


    await queryInterface.addColumn('pets', 'photo_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
