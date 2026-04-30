import { body, validationResult, matchedData } from 'express-validator';
import category from '../db/queries/category.js';
import item from '../db/queries/item.js';

const validateCategoryCreate = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('imageurl').trim().isURL().optional({ values: 'falsy' }),
];

const validateCategoryUpdate = [
  body('id').isInt(),
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('imageurl').trim().isURL().optional({ values: 'falsy' }),
];

const categoryController = {};

categoryController.index = async (req, res) => {
  const rows = await category.all('asc');
  res.render('category/categories', { categories: rows });
};

categoryController.create = [
  validateCategoryCreate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Re-render form with errors
      const rows = await category.all('asc');
      return res.render('category/categories', {
        categories: rows,
        errors: errors.array(),
        formData: req.body,
      });
    }

    try {
      const { name, imageurl } = matchedData(req);
      await category.create(name, imageurl);
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

categoryController.update = [
  validateCategoryUpdate,
  async (req, res) => {
    const errors = validationResult(req);

    try {
      const { id, name, imageurl } = matchedData(req);
      const result = await category.update(id, {
        name,
        imageurl,
      });

      res.redirect(`/category`);
    } catch (error) {
      console.error(error);
    }
  },
];

categoryController.delete = async (req, res) => {
  console.log('huh');
  try {
    const { id } = req.params;

    const result = await category.delete(id);
    res.redirect('/category');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting category');
  }
};

export default categoryController;
