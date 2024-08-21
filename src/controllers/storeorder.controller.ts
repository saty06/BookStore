/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import orderService from '../services/storeorder.service';

import { Request, Response, NextFunction } from 'express';

class UserController {
  public OrderService = new orderService();

  /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.OrderService.createOrder(req.body);
      console.log(req.body)
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All users fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Controller to get a single user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public createOrderCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.OrderService.createOrderCart(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'User fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

    /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
    public getAllOrder = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.OrderService.getAllOrder(req.body.userId);
        res.status(HttpStatus.CREATED).json({
          code: HttpStatus.CREATED,
          data: data,
          message: 'User created successfully'
        });
      } catch (error) {
        next(error);
      }
    };

  /**
   * Controller to create new user
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public getOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.OrderService.getOrder(req.params.orderId);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'User created successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
