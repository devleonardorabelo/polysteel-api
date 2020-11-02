import { Router } from 'express';
import AuthController from './controllers/AuthController';
import HomeController from './controllers/HomeController';

const routes = Router();

routes.get('/', HomeController.index);
routes.post('/account/signup', AuthController.signup);

export default routes;
