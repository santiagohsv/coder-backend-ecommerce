import { Request, Response } from 'express';

import generateToken from '../services/auth';
import logger from '../services/logger';
import { notifNewUser } from '../services/mailing';
import { apiGetCart, apiCreateCart } from '../apis/cart';
import { apiGetUser, apiCreateUser } from '../apis/user'
import { IUser } from "../models/user";

export default class Auth {

  constructor() {}

  static login = async (req: Request, res: Response) => {

    try {

      const { mail } = req.body;
      const user = await apiGetUser(mail) as IUser;

      // Generate token
      const token = generateToken(user);

      // Create new Cart (in case there is not allready created ) 
      const cart = await apiGetCart(mail)
      if(!cart){
        await apiCreateCart(mail);
      }

      // Send Headers to client & Log
      logger.info(`New login - User:${user.mail}`);  
      res.header('auth-token', token).json({ msg: 'Welcome' });

    } catch (err: any) {
      res.json({msg: err.message});
      logger.info(`Error, ${err.message}`);
    }
  };

  static signup = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      // Create new user
      const newUser = await apiCreateUser(data);

      // Send new user mail notification
      notifNewUser(data.mail, data.firstName);

      // Generate token
      const token = generateToken(newUser);

      // Send Headers
      res.header('auth-token', token).json({
        error: null,
        data: { token },
      });

    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      if (err.code === 11000) {
        res.status(404).json({
          msg: `Email address is already being used`,
        });
      } else {
        res.json(err.message);
      }
    }
  };
}
