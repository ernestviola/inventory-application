import { body, validationResult, matchedData } from 'express-validator';
import item from '../db/models/item.js';

const validateItem = [
  body('name').trim().isAlphanumeric(),
  body('quantity').trim().isNumeric().optional(),
  body('price').isNumeric().optional(),
  body('imageurl').trim().isURL().optional(),
  body('category_id').isNumeric(),
];

const itemController = {};

itemController.create = [
  validateItem,
  async (req, res) => {
    const { name, quantity, price, imageurl, category_id } = matchedData(req);
    const result = await item.create(
      name,
      quantity,
      price,
      imageurl,
      category_id,
    );
    res.redirect(`/category/${category_id}`);
  },
];

itemController.edit = async (req, res) => {
  const { id } = req.params;
  const itemResult = await item.find(id);
  res.render('item/edit', { item: itemResult[0] });
};

itemController.update = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);

    try {
      const { id } = req.params;
      const { name, quantity, price, imageurl, category_id } = matchedData(req);
      const itemResult = await item.update(id, {
        name,
        quantity,
        price,
        imageurl,
      });
      res.redirect(`/category/${category_id}`);
    } catch (error) {
      console.error(error);
    }
  },
];

itemController.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id } = req.body;
    const itemResult = await item.delete(id);
    res.redirect(`/category/${category_id}`);
  } catch (error) {
    console.error(error);
  }
};

export default itemController;
