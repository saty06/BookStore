import { Sequelize, DataType, Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
class bookUser extends Model{
    public id :number;
    public first_Name:string;
    public last_name:string;
    public email:string;
    public phoneNumber:number
    public password:string;
    public role:string
}
bookUser.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        first_Name:{
            type:DataTypes.STRING(120),
            allowNull:false
        },
        last_name:{
            type:DataTypes.STRING(120),
            allowNull:true
        },
        email:{
            type:DataTypes.STRING(200),
            allowNull:true
        },

        password:{
            type:DataTypes.STRING,
            allowNull:true

        },
        phoneNumber:{
            type:DataTypes.STRING,
            allowNull:true
        },
        role:{
            type:DataTypes.STRING(100),
            allowNull:true
        }

    },
    {
        sequelize,
        modelName:'bookuser',
        schema:'bookstore',
        timestamps:true
    }
)
export default bookUser