import sequelize, { DataTypes } from '../config/database';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import util from '../utils/user.util';
import Logger from '../config/logger'

import user from '../models/user';

class UserService {
  private User = user(sequelize, DataTypes);
  private Utils = new util();
  private logger = Logger.logger;

  //create a new user
  public newUser = async (body) => {
    try {
      const data = await this.User.create(body);
      return data;
    } catch (err) {
      this.logger.error('[Logger] User Services: Register User: ', err);
    }
  };

  // login 
  public getUser = async (email, password, role) => {
    try {
      const data = await this.User.findOne({ where: { email: email } });
      if (data && data.dataValues.role === role && await (bcrypt.compare(password, data.dataValues.password))) {
        const token = await this.Utils.getToken(data.dataValues.id, data.dataValues.role);
        const user = {
          token: token,
          data: data
        }
        return user;
      }
      return 'Invalid Credentials';
    } catch (err) {
      this.logger.error('[Logger] User Services: Login User: ', err);
    }

  };

  //update a user
  public updateUser = async (id, body) => {
    await this.User.update(body, {
      where: { id: id }
    });
    return body;
  };

  //delete a user
  public deleteUser = async (id) => {
    await this.User.destroy({ where: { id: id } });
    return '';
  };

  //get all users
  public getAllUsers = async (): Promise<IUser[]> => {
    const data = await this.User.findAll();
    return data;
  };
}

export default UserService;
