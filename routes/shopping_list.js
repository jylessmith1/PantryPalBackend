const express = require('express');
const router = express.Router();
const { shopping_list } = require('../models');

router.get('/', async (req, res) => {
    try {
        //This will need to be modified to .findALl( where: item.belongsToId = the user Id)
        const items = await shopping_list.findAll();
        let stuff = [{ "id": 1, "name": "from the top rope", "image": "banana.jpg" }, { "id": 2, "name": "Randy Orton", "image": "steak.jpg" }]
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shopping list items", error });
    }
})

router.post('/', async (req, res) => {
    try {
        const {item, quantity, quantity_metric, is_perishable, image} = req.body;
        const newItem = await shopping_list.create({
            item,
            quantity,
            quantity_metric,
            is_perishable,
            image
        });
        
        res.json(newItem);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shopping list items", error });
    }
})
        
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { item, quantity, quantity_metric, is_perishable, image } = req.body;
  
      const [updatedRowsCount] = await shopping_list.update(
        {
          item,
          quantity,
          quantity_metric,
          is_perishable,
          image
        },
        {
          where: {
            id: id
          }
        }
      );
  
      if (updatedRowsCount === 0) {
        return res.status(404).json({ message: 'shopping_list item not found' });
      }
  
      res.status(200).json({ message: 'shopping_list item updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating shopping_list item', error });
    }
  });

  router.delete('/', async (req, res) => {
    try {
      const { id } = req.body;
      const deletedItem = await shopping_list.destroy({
        where: {
          id: id
        }
      });
  
      if (deletedItem === 0) {
        return res.status(404).json({ message: 'shopping list  item not found' });
      }
  
      res.status(200).json({ message: 'shopping list item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting shopping list item', error });
    }
  });


module.exports = router;