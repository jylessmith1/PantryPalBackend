'use strict';

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('items', [
      {
        "id": 6,
        "name": "flour",
        //"image": "flour.jpg"
    },
    {
        "id": 7,
        "name": "sugar",
        //"image": "sugar.jpg"
    },
    {
      "id": 8,
      "name": "rice",
      //"image": "rice.jpg"
  },
  {
      "id": 9,
      "name": "beans",
      //"image": "beans.jpg"
  }
    ])
  },
}

down: async (queryInterface, Sequelize) => {
  await queryInterface.bulkDelete('BasketItems', null, {});
}

