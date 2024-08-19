import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Httpstatus from 'http-status-codes'
import jwt from 'jsonwebtoken'

dotenv.config()
class bookusermid{
public bookusermiddlerware=async( req:Request, res:Response,next: NextFunction):Promise<any>=>{
    try {
        let token = req.header('Authorization')?.split('')[1]
        if(!token){
            res.send(Httpstatus.BAD_REQUEST).json({
                code:Httpstatus.BAD_REQUEST,
                message:"token is not valid login again "
            })
        } 
        let toekndata = jwt.verify(token, process.env.SECREAT_KEY as string)as any
         req.body = {...req.body, ...{role:toekndata.data.role}}
        
    next()
        
        
    } catch (error) {
        res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
        
    }

}

public bookuserRollMid = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
    try {
       if(req.body){
       req.body = {...req.body, ...{role:"user"}}
       }
       next()
        
    } catch (error) {
        res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
        
        
    }
}

public bookAdminRollMid = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
    try {
        if(req.body){
            req.body = {...req.body, ...{role:"admin"}}
        }
        next();
        
    } catch (error) {
        res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
        
        
    }

}

}
export default bookusermid