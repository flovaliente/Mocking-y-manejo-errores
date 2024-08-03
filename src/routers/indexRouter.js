import { Router } from 'express';
import passport from 'passport';

import indexController from '../controllers/indexController.js';

const router = Router();

router.get('/', indexController.welcome);

router.get('/register', indexController.register);

router.get('/products', indexController.products);

router.get('/cart', indexController.cart);

router.get('/realtimeproducts', indexController.realtimeproducts);

router.get('/login', indexController.login);

router.get('/user', passport.authenticate('jwt', { session: false }), indexController.user);

router.get('/mockingproducts', indexController.mockingproducts);

export default router;