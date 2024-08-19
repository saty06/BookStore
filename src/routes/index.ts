import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookUserRoutters from './bookuser.router';

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
  router.use('/bookstore', new bookUserRoutters().getRouter())

  return router;
};

export default routes;
