import { error } from "winston";
import bookUser from "../models/boouUser";
import bcrypt from 'bcrypt'

class bookuserService{
    public BookUser = bookUser
    public newBookUser = async(first_Name:string, last_name:string, email:string, password:string, phoneNumber:string, role:string)=>{
        try {
            let data = await this.BookUser.create({
                first_Name:first_Name, last_name:last_name, email:email, phoneNumber:phoneNumber,password:password, role:role
            })
          let result ={
            id:data.id,
            first_Name:data.first_Name,
            last_name:data.last_name,
            email:data.email,
            phoneNumber:data.phoneNumber,
            role:data.role

          }
          return result
        } catch (error) {
            console.log(error)
            
        }
    }
   public getBookUser = async( email:string, role:string)=>{
   try {
    let  user = await this.BookUser.findOne({where:{email:email, role:role}})
     console.log("user service dataa ",user)
    if(!user){
        throw error
    }
    return user
    
   } catch (error) {
    console.log(error)
    
   }
   }




public updataBookUser = async(email:string, password:string, role:string)=>{
    try {

        let data = await this.BookUser.findOne({where:{email:email, role:role}})
        console.log("dataa....", data)
        let hasPassword = await  bcrypt.compare(password, data.password)
        // if(!hasPassword){
        //     return false
        // }
        console.log(password)
        password = await bcrypt.hash(password, 10)
        let newdata = await  this.BookUser.update({password:password}, {where:{email:email, role:role}}) 
        console.log("newdata ", newdata)
        return newdata
    } catch (error) {
        console.log(error)
        
    }

}
public getAllBookUser = async()=>{
    try {
        let data = await  this.BookUser.findAll()
       return data 
        
    } catch (error) {
        console.log(error)
        
    }
}
public deleteBookUser = async (id:number)=>{
    try {
        let data  = await this.BookUser.destroy({ where:{id:id}})
   return data
        
    } catch (error) {
        console.log(error)
        
    }
}

}
export default bookuserService