'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Cart extends Model {
    public bookId: number;
    public userId: number;
    public quantity: number;
    public price: number;
   
    static associate(models) {
    Cart.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Cart.belongsTo(models.Books, {
      foreignKey: 'bookId',
    })
    }
  }
  Cart.init(
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      sequelize,
      modelName: 'cart',
      indexes: [
        {
          fields: ['userId'],
          using: 'btree',
        },
        {
          fields: ['id'],
          using: 'btree',
        }
      ]
    }
  );
  return Cart;
};
