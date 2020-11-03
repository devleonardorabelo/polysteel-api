import { Router } from 'express';

import SignInController from '../controllers/SignInController';
import SignUpController from '../controllers/SignUpController';

const authRoutes = Router();

authRoutes.post('/signin', SignInController.index);
authRoutes.post('/recovery', SignInController.show);
authRoutes.post('/newpass', SignInController.update);
authRoutes.post('/signup', SignUpController.store);
authRoutes.post('/signup/confirm', SignUpController.update);

export default authRoutes;
