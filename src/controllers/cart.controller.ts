/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import cartService from '../services/cart.service';

import { Request, Response, NextFunction } from 'express';

class CartController {
  public CartService = new cartService();

    /**
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
    public getCart = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.CartService.getCart(req.body.userId);
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
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public createCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.createCart(req.body);
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
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
    public updateCartAdd = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        console.log(req.body);
        const data = await this.CartService.increaseBook(req.body);
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
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
  public updateCartDes = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.decreaseBook(req.body);
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
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
   public deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const data = await this.CartService.deleteBook(req.params.id);
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
   * Controller to get all users available
   * @param  {object} Request - request object
   * @param {object} Response - response object
   * @param {Function} NextFunction
   */
    public deleteCart = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<any> => {
      try {
        const data = await this.CartService.deleteCart(req.body);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'All users fetched successfully'
        });
      } catch (error) {
        next(error);
      }
    };

  }

export default CartController;
