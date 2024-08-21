import express, { IRouter } from 'express';
import bookController from '../controllers/storebook.controller';
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

    this.router.get('/', userAuth, this.BookController.getAllBook); // when page is lod return all books =>get all books
// required all routes adminauth 
    this.router.get('/admin', adminAuth, this.BookController.getAllBook);

    this.router.get('/admin/:adminid', adminAuth, this.BookController.getBookAdmin); // each and ervery admin will get own book => get books by admin id 

    this.router.get('/:bookid', userAuth, this.BookController.getBookId); 

    this.router.get('/admin/:bookid', adminAuth, this.BookController.getBookId); // get books by book id

    this.router.post('/admin', adminAuth, this.admin.adminVerify, this.BookController.createBook); // this is done bu admin => create book 

    this.router.post('/:bookid/update', adminAuth, this.BookController.updateBook); // update book

    this.router.delete('/:bookid/delete', adminAuth, this.BookController.deleteBook)// delete book 

  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default BookRoutes;
