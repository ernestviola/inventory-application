import { body, validationResult, matchedData } from 'express-validator';
import item from '../db/queries/item.js';

const validateItem = [
  body('name').trim().isAlphanumeric(),
  body('quantity').trim().isNumeric().optional(),
  body('price').isNumeric().optional(),
  body('imageurl').trim().isURL().optional(),
  body('category_id').isNumeric(),
];

const itemController = {};

itemController.new = [
  validateItem,
  async (req, res) => {
    const { name, quantity, price, imageurl, category_id } = matchedData(req);
    console.log(name, quantity, price, imageurl, category_id);
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

export default itemController;
