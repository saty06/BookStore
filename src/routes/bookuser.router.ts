import express from 'express'
import bookUsercontroller from '../controllers/bookuser.controller'
import bookusermid from '../middlewares/bookuser.middleware'

class bookUserRoutters{
    public BookUserController = new bookUsercontroller()
    public BookUserMid = new bookusermid()
    public router = express.Router()

    constructor(){
        this.routers()

    }
    public routers = ()=>{
        // user routes 
        this.router.post('/user', this.BookUserController.newBookUserCon)
        this.router.post('/user/login', this.BookUserMid.bookAdminRollMid,this.BookUserController.getBookUsercon);
        this.router.post('/user/update/:id', this.BookUserController.updateBookUsercon);
        this.router.post('/user/delete/:id', this.BookUserController.deletBookUsercon)
        // admin routes
        this.router.post('/admin', this.BookUserController.newBookUserCon)
        this.router.post('/admin/login', this.BookUserController.getBookUsercon);
        this.router.post('/admin/update/:id', this.BookUserController.updateBookUsercon);
        this.router.post('/admin/delete/:id', this.BookUserController.deletBookUsercon)

    }
    public getRouter = ()=>{
        return this.router
    }
}
export default bookUserRoutters