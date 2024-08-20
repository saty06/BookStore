'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Wishlist extends Model {
    public bookId: number;
    public userId: number;
   
    static associate(models) {
    Wishlist.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Wishlist.belongsTo(models.Books, {
      foreignKey: 'bookId',
    })
    }
  }
  Wishlist.init(
    {
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'books',
              key: 'id',
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'users', 
              key: 'id'
            }
        },
    },
    {
      sequelize,
      modelName: 'wishlist',
    }
  );
  return Wishlist;
};
