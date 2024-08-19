import bookUser from "../models/boouUser";


class bookuserService{
    public BookUser = bookUser

    public newBookUser = async(first_Name:string, last_name:string, email:string, password:string, phoneNumber:number, role:string):Promise<any>=>{
        try {
            let data = await this.BookUser.create({
                first_Name:first_Name, last_name:last_name, email:email, phoneNumber:phoneNumber,password:password, role:role
            })
            if(data){
                return data 
            }
            else{
                return  false
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }
   public getBookUser = async( email:string, password:string, role:string):Promise<any>=>{
  try {
   let data = this.BookUser.findOne({where:{email:email, password:password, role:role}})
   return data 
    
} catch (error) {
    console.log(error)
    
}
   }

public updataBookUser = async(email:string, password:string, role:string)=>{
    try {
        let data = this.BookUser.update({password:password}, {where:{email:email}})
        if(data){
            return data 
        }
        else{
            return false
        }
        
    } catch (error) {
        console.log(error)
        
    }

}
public getAllBookUser = async()=>{
    try {
        let data = this.BookUser.findAll()
        if(data){
            return data 
        }
        else{
            return data 
        }
        
    } catch (error) {
        console.log(error)
        
    }
}
public deleteBookUser = async (id:number)=>{
    try {
        let data  = await this.BookUser.destroy({ where:{id:id}})
        if(data){
            return data 
        }
        else{
            return false
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

}


export default bookuserService