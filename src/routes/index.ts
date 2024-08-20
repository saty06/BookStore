import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from './book.route';
import cartRoute from './cart.route';
import orderRoute from './order.route';
import wishlistRoute from './wishlist.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });

  router.use('/users', new userRoute().getRoutes());

  router.use('/books', new bookRoute().getRoutes());

  router.use('/cart', new cartRoute().getRoutes());

  router.use('/order', new orderRoute().getRoutes());

  router.use('/wishlist', new wishlistRoute().getRoutes());

  return router;
};

export default routes;
