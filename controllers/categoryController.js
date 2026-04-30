import { body, validationResult, matchedData } from 'express-validator';
import category from '../db/queries/category.js';
import item from '../db/queries/item.js';

const validateCategory = [
  body('id').isInt(),
  body('name').trim(),
  body('imageUrl').trim(),
];

const categoryController = {};

categoryController.index = async (req, res) => {
  const rows = await category.all();
  res.render('category/categories', { categories: rows });
};

categoryController.create = [
  validateCategory,
  async (req, res) => {
    const errors = validationResult(req);

    try {
      const { name, imageUrl } = matchedData(req);
      await category.create(name, imageUrl);
      res.redirect('/category');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal error');
    }
  },
];

categoryController.getOne = async (req, res) => {
  const { id } = req.params;
  const categoryResult = await category.find(id);
  const itemsResult = await item.findByCategory(id);

  res.render('category/category', {
    category: categoryResult[0],
    items: itemsResult,
  });
};

categoryController.edit = async (req, res) => {
  const { id } = req.params;
  const categoryResult = await category.find(id);
  console.log(categoryResult);
  res.render('category/edit', { category: categoryResult[0] });
};

categoryController.update = () => {};

categoryController.delete = () => {};

export default categoryController;
