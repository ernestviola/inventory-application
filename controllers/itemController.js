import { body, validationResult, matchedData } from 'express-validator';
import item from '../db/queries/item.js';

const validateItem = [
  body('name').trim().isAlphanumeric(),
  body('quantity').trim().isNumeric().optional(),
  body('price').isNumeric().optional(),
  body('imageUrl').trim().isURL().optional(),
  body('category_id').isNumeric(),
];

const itemController = {};

itemController.new = [
  validateItem,
  async (req, res) => {
    const { name, quantity, price, imageUrl, category_id } = matchedData(req);
    console.log(name, quantity, price, imageUrl, category_id);
    const result = await item.create(
      name,
      quantity,
      price,
      imageUrl,
      category_id,
    );
    res.redirect(`/category/${category_id}`);
  },
];

export default itemController;
