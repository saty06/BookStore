import express, { IRouter } from 'express';
import orderController from '../controllers/order.controller';
import userValidator from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

class OrderRoutes {
  private OrderController = new orderController();
  private router = express.Router();
  private UserValidator = new userValidator();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.get('/', userAuth, this.OrderController.getAllOrder);

    this.router.get('/:orderId', userAuth, this.OrderController.getOrder);  // registration

    this.router.post('/', userAuth, this.OrderController.createOrder);  // registration admin

    this.router.post('/cart', userAuth, this.OrderController.createOrderCart); 
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default OrderRoutes;
