'use strict';
import { Model } from 'sequelize';
import { IBOOK } from '../interfaces/book.interface';

export default (sequelize, DataTypes) => {
  class Book extends Model<IBOOK> implements IBOOK {
    public description;
    public discountPrice;
    public bookImage;
    public admin_user_id;
    public bookName;
    public author;
    public quantity;
    public price;
   
    static associate(models) {
        Book.belongsTo(models.Users, {
            foreignKey: 'admin_user_id',
    })
    }
  }
  Book.init(
    {
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discountPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bookImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        admin_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        bookName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      sequelize,
      modelName: 'book', 
      indexes: [
        {
            fields: ['admin_user_id'], 
            using: 'btree', 
        }, 
        {
            unique: true,
            fields: ['id'],
            using: 'btree',
        }
      ],
    }
  );
  return Book;
};
