var express = require('express');
var router = express.Router();

const { Inventory } = require('../models');

router.post('/', async (req, res) => {
    try {
        const timestamp = new Date().getTime();
        const {item, quantity, quantity_metric, is_perishable, image} = req.body;
        const newItem = await Inventory.create({
            item,
            quantity,
            quantity_metric,
            is_perishable,
            image,
            item_date: timestamp //Use the timestamp value for the item_date field
            });
        res.status(201).json(newItem);
      } catch (error) {
        res.status(500).json({ message: 'Error adding Inventory item', error });
      }
    })



router.get('/', async (req, res) => {
        try {
            //This will need to be modified to .findALl( where: item.belongsToId = the user Id)

            const items = await Inventory.findAll();

      

            res.json(items);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving Inventory items", error });
        }
    })

    router.delete('/', async (req, res) => {
        try {
          const { id } = req.body;
          const deletedItem = await Inventory.destroy({
            where: {
              id: id
            }
          });
      
          if (deletedItem === 0) {
            return res.status(404).json({ message: 'Inventory item not found' });
          }
      
          res.status(200).json({ message: 'Inventory item deleted successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error deleting Inventory item', error });
        }
      });

      router.put('/', async (req, res) => {
        try {
          const { id } = req.body;
          const { item, quantity, quantity_metric, is_perishable, image } = req.body;
      
          const [updatedRowsCount] = await Inventory.update(
            {
              item,
              quantity,
              quantity_metric,
              is_perishable,
              image,
              item_date: Date.now(),
            },
            {
              where: {
                id: id
              }
            }
          );
      
          if (updatedRowsCount === 0) {
            return res.status(404).json({ message: 'Inventory item not found' });
          }
      
          res.status(200).json({ message: 'Inventory item updated successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error updating Inventory item', error });
        }
      });
      
      

    module.exports = router;