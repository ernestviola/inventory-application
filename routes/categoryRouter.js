import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.index);

categoryRouter.get('/:id', categoryController.getOne);

categoryRouter.post('/new', categoryController.create);

export default categoryRouter;
