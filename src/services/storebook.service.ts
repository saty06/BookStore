import sequelize, { DataTypes } from '../config/database';

import book from '../models/book';

class BookService {
  private Book = book(sequelize, DataTypes);

  //get all users
  public getAllBook = async () => {
    const data = await this.Book.findAll();
    return data;
  };

  //create a new user
  public getBookAdmin = async (id) => {
    const data = await this.Book.findOne( {
      where: { admin_user_id: id }
    });
    return data;
  };

  //update a user
  public getBookId = async (id) => {
    const data = await this.Book.findOne( {
      where: { id: id }
    });
    return data;
  };

  //delete a user
  public createBook = async (body) => {
    const obj = {
      "description": body.description,
      "discountPrice": body.discountPrice,
      "bookImage": " ",
      "admin_user_id": body.userId,
      "bookName": body.bookName,
      "author": body.author, 
      "quantity":body.quantity,
      "price": body.price
    }
    const data = await this.Book.create(obj);
    return data;
  };

  //get a single user
  public updateBook = async (id, body) => {
    const obj = {
      // "description": body.description,
      // "bookImage": " ",
      // "admin_user_id": body.userId,
      // "bookName": body.bookName,
      // "author": body.author, 
      // "quantity":body.quantity,
      "discountPrice": body.discount,
      "price": body.price
    }
    const data = await this.Book.update(obj, {
      where: { id : id }
    });
    return data;
  };

  //get a single user
  public deleteBook = async (id) => {
    const data = await this.Book.destroy(id);
    return data;
  };
}

export default BookService;
