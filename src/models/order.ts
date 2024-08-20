'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Order extends Model {
    public bookId: number;
    public userId: number;
    public quantity: number;
    public price: number;
   
    static associate(models) {
    Order.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    Order.belongsTo(models.Books, {
      foreignKey: 'bookId',
    })
    }
  }
  Order.init(
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
      modelName: 'order',
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
  return Order;
};
