import { body, validationResult, matchedData } from 'express-validator';
import item from '../db/models/item.js';
import category from '../db/models/category.js';

const validateItem = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer').optional({ values: 'falsy' }),
  body('price').notEmpty().withMessage('Price is required').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('imageurl').trim().isURL().optional({ values: 'falsy' }),
  body('category_id').isInt(),
];

const itemController = {};

itemController.create = [
  validateItem,
  async (req, res) => {
    const errors = validationResult(req);
    const { category_id } = req.body;
    if (!errors.isEmpty()) {
      const [categoryResult, itemsResult] = await Promise.all([
        category.find(category_id),
        item.findByCategory(category_id),
      ]);
      return res.render('category/category', {
        category: categoryResult[0],
        items: itemsResult,
        errors: errors.array(),
        formData: req.body,
        openDialog: 'new-item-dialog',
      });
    }
    try {
      const { name, quantity, price, imageurl } = matchedData(req);
      await item.create(name, quantity, price, imageurl, category_id);
      res.redirect(`/category/${category_id}`);
    } catch (error) {
      console.log(error);
    }
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
    const { id } = req.params;
    const { category_id } = req.body;
    if (!errors.isEmpty()) {
      const [categoryResult, itemsResult] = await Promise.all([
        category.find(category_id),
        item.findByCategory(category_id),
      ]);
      return res.render('category/category', {
        category: categoryResult[0],
        items: itemsResult,
        errors: errors.array(),
        formData: req.body,
        formItemId: id,
        openDialog: `edit-item-${id}`,
      });
    }
    try {
      const { name, quantity, price, imageurl } = matchedData(req);
      await item.update(id, { name, quantity, price, imageurl });
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
    await item.delete(id);
    res.redirect(`/category/${category_id}`);
  } catch (error) {
    console.error(error);
  }
};

export default itemController;
