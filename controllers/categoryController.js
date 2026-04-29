import { Router } from 'express';
import { body, validationResult, matchedData } from 'express-validator';

const validateCategory = [body('id').isInt(), body('name').trim()];

const categoryController = {};

categoryController.create = () => {};

categoryController.getOne = () => {};

categoryController.getAll = () => {};

categoryController.update = () => {};

categoryController.delete = () => {};

export default categoryController;
