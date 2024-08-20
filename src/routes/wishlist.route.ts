import express, { IRouter } from 'express';
import wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

class WishlistController {
  private WishlistController = new wishlistController();
  private router = express.Router();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.post('/', userAuth, this.WishlistController.createWishlist); // Getting 

    this.router.post('/delete', userAuth, this.WishlistController.deleteWishlist);  // registration

    this.router.get('/', userAuth, this.WishlistController.getWishlist); //

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default WishlistController;
