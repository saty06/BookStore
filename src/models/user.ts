'use strict';
import { Model } from 'sequelize';
import { IUser } from '../interfaces/user.interface';
import bycrpt  from 'bcrypt';

export default (sequelize, DataTypes) => {
  class User extends Model<IUser> implements IUser {
    public firstName;
    public lastName;
    public email;
    public password;
    public mobileNo;
    public role: { enum: ['admin', 'user'] };

   
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobileNo: {
        type: DataTypes.INTEGER,
        defaultValue: 1234567890,
      },
      role: { 
        type:DataTypes.STRING,
        defaultValue: 'user',
      }
    },
    {
      sequelize,
      modelName: 'user',
      hooks:{
        beforeCreate: async(user) => {
          if (user.password){
            user.password = await bycrpt.hash(user.password, 10);
          }
        },
        beforeUpdate: async(user) => {
          if (user.changed(user.password)){
            user.password = await bycrpt.hash(user.password, 10);
          }
        }
      },
      indexes: [
        {
          fields: ['email'],
          using: 'hash'
        },
        {
          fields: ['id'],
          using: 'btree'
        }
      ]
    }
  );
  return User;
};
