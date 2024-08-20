import express, { IRouter } from 'express';
import cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

class CartRoutes {
  private CartController = new cartController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.get('/', userAuth, this.CartController.getCart); 

    this.router.post('/', userAuth, this.CartController.createCart);  

    this.router.post('/add', userAuth, this.CartController.updateCartAdd);

    this.router.post('/reduce', userAuth, this.CartController.updateCartDes);

    this.router.post('/delete/:id' , userAuth, this.CartController.deleteBook);

    this.router.post('/delete', userAuth, this.CartController.deleteCart);

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default CartRoutes;
