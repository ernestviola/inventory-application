import { Router } from 'express';
import itemController from '../controllers/itemController.js';

const itemRouter = Router();

itemRouter.post('/new', itemController.create);

itemRouter.get('/:id/edit', itemController.edit);

itemRouter.post('/:id/update', itemController.update);

itemRouter.post('/:id/delete', itemController.delete);

export default itemRouter;
