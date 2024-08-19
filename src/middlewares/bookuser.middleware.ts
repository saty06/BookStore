import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import Httpstatus from 'http-status-codes'
dotenv.config()
class bookusermid{
public bookusermid=async( req:Request, res:Response,next: NextFunction):Promise<any>=>{
    try {
        const token = req.header('Authorization')?.split('')[1]
        if(!token){
            res.send(Httpstatus.BAD_REQUEST).json({
                code:Httpstatus.BAD_REQUEST,
                message:"token is not valid login again "
            })
        } 
    next()
        
        
    } catch (error) {
        res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
        
    }

}

public bookuserRollMid = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
    try {
       if(req.body){
        req.body.roll = 'user'
       }
       next()
        
    } catch (error) {
        res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
        
        
    }
}

public bookAdminRollMid = async(req:Request, res:Response, next:NextFunction):Promise<any>=>{
    try {
        if(req.body){
            req.body.roll = 'admin'
        }
        
    } catch (error) {
        res.send(Httpstatus.BAD_REQUEST).json({code:Httpstatus.BAD_REQUEST, message:"Interal server error"})
        
        
    }

}

}
export default bookusermid