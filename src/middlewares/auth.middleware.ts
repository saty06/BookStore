/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';

const secreat_key = config.development.secreat;
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { id, role }: any = await jwt.verify(bearerToken, secreat_key);
    if ( role == "user") {
      req.body.userId = id;
    req.body.role = role;
      next();
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: "user Not Authorised to Perform this action",
        message: 'Please Login with Valid Credentials'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const { id, role }: any = await jwt.verify(bearerToken, secreat_key);
    if ( role === "admin") {
      req.body.userId = id;
    req.body.role = role;
      next();
    } else {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: "user Not Authorised to Perform this action",
        message: 'Please Login with Valid Credentials'
      });
    }
  } catch (error) {
    next(error);
  }
};
