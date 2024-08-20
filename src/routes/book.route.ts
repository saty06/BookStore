import express, { IRouter } from 'express';
import bookController from '../controllers/book.controller';
import adminVerify from '../validators/user.validator';
import { adminAuth, userAuth } from '../middlewares/auth.middleware';

class BookRoutes {
  private BookController = new bookController();
  private router = express.Router();
  private admin = new adminVerify();

  constructor() {
    this.routes();
  }

  private routes = () => {

    this.router.get('/', userAuth, this.BookController.getAllBook); // get all books

    this.router.get('/admin', adminAuth, this.BookController.getAllBook);

    this.router.get('/admin/:adminid', adminAuth, this.BookController.getBookAdmin); // get books by admin id // validation

    this.router.get('/:bookid', userAuth, this.BookController.getBookId); // get books by book id

    this.router.get('/admin/:bookid', adminAuth, this.BookController.getBookId); // get books by book id

    this.router.post('/admin', adminAuth, this.admin.adminVerify, this.BookController.createBook); // create book // validator for admin role

    this.router.post('/:bookid/update', adminAuth, this.BookController.updateBook); // update book // validation

    this.router.delete('/:bookid/delete', adminAuth, this.BookController.deleteBook)// delete book // validation

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default BookRoutes;
