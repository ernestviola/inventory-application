import { Router } from 'express';
import itemController from '../controllers/itemController.js';

const itemRouter = Router();

itemRouter.post('/new', itemController.new);

export default itemRouter;
