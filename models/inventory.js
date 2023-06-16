'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init({
    item: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    quantity_metric: DataTypes.STRING,
    is_perishable: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    item_date: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};