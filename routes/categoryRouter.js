import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.index);

categoryRouter.get('/:id', categoryController.getOne);

categoryRouter.post('/new', categoryController.create);

categoryRouter.get('/:id/edit', categoryController.edit);

categoryRouter.post('/:id/update', categoryController.update);

categoryRouter.post('/:id/delete', categoryController.delete);

export default categoryRouter;
