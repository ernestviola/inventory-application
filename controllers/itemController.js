import { body, validationResult, matchedData } from 'express-validator';
import item from '../db/queries/item.js';

const validateItem = [
  body('name').trim(),
  body('quantity'),
  body('price'),
  body('imageUrl'),
  body('category_id'),
];

const itemController = {};

itemController.new = [
  validateItem,
  (req, res) => {
    const { name, quantity, price, imageUrl, category_id } = matchedData(req);

    res.redirect(`/category/${category_id}`);
  },
];

export default itemController;
