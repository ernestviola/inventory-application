import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.index);

categoryRouter.get('/:id', categoryController.getOne);

categoryRouter.post('/new', categoryController.create);

categoryRouter.get('/:id/edit', categoryController.edit);

export default categoryRouter;
