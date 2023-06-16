'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Inventories', 'user_id', {
      type: Sequelize.STRING,
      allowNull: true // Modify the allowNull value as per your requirements
    });
    await queryInterface.addColumn('shopping_lists', 'user_id', {
      type: Sequelize.STRING,
      allowNull: true // Modify the allowNull value as per your requirements
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Inventories', 'user_id');
    await queryInterface.removeColumn('shopping_lists', 'user_id');
  }
}
