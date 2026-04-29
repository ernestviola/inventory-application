import { Router } from 'express';
import categoryController from '../controllers/categoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', categoryController.index);
categoryRouter.get('/new', categoryController.renderNewForm);
categoryRouter.post('/new', categoryController.createNew);

export default categoryRouter;
