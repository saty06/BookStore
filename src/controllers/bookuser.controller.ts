import { Request, Response, NextFunction } from "express";
import HttpStatus from 'http-status-codes'
import bookuserService from "../services/bookuser.service";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import Httpstatus from 'http-status-codes'
dotenv.config()
class bookUsercontroller{
    public BookUserService = new bookuserService()

    public newBookUserCon = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
          try {
            let{first_Name, last_name, email, phoneNumber, password, role} = req.body
            if(password){
                password = await bcrypt.hash(password, 10)
            }
            let data = await this.BookUserService.newBookUser(first_Name, last_name, email, password, phoneNumber, role)
            if(data){
                return res.status(HttpStatus.CREATED).json({
                    code:HttpStatus.CREATED,
                    data:data,
                    message:"successful "
                })
            }
            else{
                return res.status(HttpStatus.BAD_REQUEST).json({
                    code:HttpStatus.BAD_REQUEST,
                    message:"try again "
                })
            }
            
          } catch (error) {
            next(error)
            
            
          }
    }
    public getBookUsercon = async( req:Request, res:Response, next:NextFunction):Promise<any>=>{
                try {
    let{email, password, role} = req.body
    let data = await this.BookUserService.getBookUser(email, role)
      // Compare passwords
      let hasPassword = await bcrypt.compare(password, data.password);
      if (!hasPassword) {
          return res.status(HttpStatus.BAD_REQUEST).json({
              code: HttpStatus.BAD_REQUEST,
              message: "Invalid password. Please try again."
          });
      }
  let paylod = {
    id:data.id,
    email:data.email,
    role:data.role
  }
      // Generate JWT token
      let token = jwt.sign(paylod, process.env.SECREAT_KEY as string, { expiresIn: '3h' });

      if (token) {
          res.header('Authorization', `Bearer ${token}`);
          return res.status(HttpStatus.ACCEPTED).json({
              code: HttpStatus.ACCEPTED,
              token: `Bearer ${token}`,
              message: "Login successful."
          });
      } else {
          return res.status(HttpStatus.BAD_REQUEST).json({
              code: HttpStatus.BAD_REQUEST,
              message: "Token generation failed. Please try again."
          });
      }
                } catch (error) {
                    console.log(error)
                    
                }

        
        
   
    }
    public updateBookUsercon = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
        try {
            const{email, password, role} = req.body
            let data =  this.BookUserService.updataBookUser(email, password, role)

            if(data){
                return res.status(HttpStatus.ACCEPTED).json({
                    code:HttpStatus.ACCEPTED,
                    message:"successful"
                })
            }
            else{
                return res.status(HttpStatus.BAD_REQUEST).json({
                    code:HttpStatus.BAD_REQUEST,
                    message:"try again "
                })
            }

        } catch (error) {
            res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
            next(error)
        }
    }

    public getallBookUsercon = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
               try {
                let data = this.BookUserService.getAllBookUser()
                if(data){
                    return res.status(HttpStatus.ACCEPTED).json({
                        code:HttpStatus.ACCEPTED,
                        data:data,
                        message:"successful"
                    })
                }
                else{
                    return res.status(HttpStatus.BAD_REQUEST).json({
                        code:HttpStatus.BAD_REQUEST,
                        message:"try again "
                    })
                }

               } catch (error) {
                
                res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
               }
    }
     public deletBookUsercon = async(req:Request, res:Response, next:NextFunction ):Promise<any>=>{
        try {
            let id = req.params.id
            let newId = parseInt(id)
            let data = this.BookUserService.deleteBookUser(newId) 
             if(data){
                return res.status(HttpStatus.ACCEPTED).json({
                    code:HttpStatus.ACCEPTED,
                    data:data,
                    message:"successful"
                })
            }
            else{
                return res.status(HttpStatus.BAD_REQUEST).json({
                    code:HttpStatus.BAD_REQUEST,
                    message:"try again "
                })
            }

            
        } catch (error) {
            res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
            
        }
     }
}

export default bookUsercontroller 