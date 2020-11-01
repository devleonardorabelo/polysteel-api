import { Router } from 'express';
import HomeController from './controllers/HomeController';

const routes = Router();

routes.get('/', HomeController.index);

export default routes;
