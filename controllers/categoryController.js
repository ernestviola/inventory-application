import { body, validationResult, matchedData } from 'express-validator';
import category from '../db/queries/category.js';

const validateCategory = [
  body('id').isInt(),
  body('name').trim(),
  body('imageUrl').trim(),
];

const categoryController = {};

categoryController.index = async (req, res) => {
  const { rows } = await category.all();
  console.log(rows[0]);
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
  const { rows } = await category.find(id);
  res.render('category/category', { category: rows[0] });
};

categoryController.getAll = () => {};

categoryController.update = () => {};

categoryController.delete = () => {};

export default categoryController;
