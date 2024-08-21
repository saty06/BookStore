import sequelize, { DataTypes } from '../config/database';
import cart from '../models/cart';
import book from '../models/book';

class CartService {
  private Cart = cart(sequelize, DataTypes);
  private Book = book(sequelize, DataTypes);

  // Get cart by user ID
  public getCart = async (id) => {
    const data = await this.Cart.findAll({
      where: { userId: id }
    });
    return data;
  };

  public createCart = async (body) => {
    const bookData = await this.Book.findOne({
      where : {
        id : body.bookId
      }
    });
    const cartData = await this.Cart.findAll({
      where: {
        userId: body.userId
      }
    });
    if (cartData.length > 0) {
      const cartItem = cartData.find(item => item.bookId === body.bookId);
      if (cartItem){
        if (body.quantity > bookData.quantity) {
          throw new Error ('Quantity is out of range');
        }
        cartItem.quantity = body.quantity;
        cartItem.price = bookData.discountPrice;

        const data = await cartItem.save();
        bookData.quantity = bookData.quantity - data.quantity;
        const bookUpdate = await bookData.save();
        return data;
      } else {
        const obj = {
          "bookId": body.bookId,
          "userId": body.userId,
          "quantity": body.quantity,
          "price": body.price
        }
        const data = await this.Cart.create(obj);
        return data
      }
    } else {
      const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": body.price
      }
      const data = await this.Cart.create(obj);
      return data
    }   
  };

  // Method to increase book quantity or add a new book
  public increaseBook = async (body) => {
    const cartData = await this.Cart.findAll({
      where: {
        userId : body.userId
      }
    });
    if (cartData.length > 0) {
      const cartItem = cartData.find(item => item.bookId === body.bookId);
      if (cartItem){
         let quantity = cartItem.quantity;
         quantity += 1;
         cartItem.quantity = quantity;

        const data = await cartItem.save();
        return data;
      } else {
        const obj = {
          "bookId": body.bookId,
          "userId": body.userId,
          "quantity": body.quantity,
          "price": body.price
        }
        const data = await this.Cart.create(obj);
        return data
      }
    } else {
      const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": body.price
      }
      const data = await this.Cart.create(obj);
      return data
    }   
  };

  public decreaseBook = async (body) => {
    const cartData = await this.Cart.findAll({
      where: {
        userId : body.userId
      }
    });
    if (cartData.length > 0) {
      const cartItem = cartData.find(item => item.bookId === body.bookId);
      if (cartItem){
         let quantity = cartItem.quantity;
         quantity -= 1;
         cartItem.quantity = quantity;

        const data = await cartItem.save();
        return data;
      } else {
        const obj = {
          "bookId": body.bookId,
          "userId": body.userId,
          "quantity": body.quantity,
          "price": body.price
        }
        const data = await this.Cart.create(obj);
        return data
      }
    } else {
      const obj = {
        "bookId": body.bookId,
        "userId": body.userId,
        "quantity": body.quantity,
        "price": body.price
      }
      const data = await this.Cart.create(obj);
      return data
    }  
  };

  public deleteBook = async (id) =>{
    const data = await this.Cart.destroy({
      where: {
        id: id
      }
    });
    return data;
  }

  public deleteCart = async (body) => {
    const cartData = await this.Cart.destroy({
      where: { 
        userId: body.userId 
      }
    });
    return cartData
  }
}

export default CartService;
