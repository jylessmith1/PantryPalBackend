'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {



  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Inventories', 'item_date', {
      type: Sequelize.BIGINT,
      allowNull: true // Modify the allowNull value as per your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Inventories', 'item_date');
  }
}





