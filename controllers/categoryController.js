import { Router } from 'express';
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
  res.json(rows);
};

categoryController.renderNewForm = (req, res) => {
  res.render('category/new');
};

categoryController.createNew = [
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

categoryController.create = () => {};

categoryController.getOne = () => {};

categoryController.getAll = () => {};

categoryController.update = () => {};

categoryController.delete = () => {};

export default categoryController;
