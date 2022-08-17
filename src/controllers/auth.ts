import { Request, Response } from "express";
import bcrypt from "bcrypt";
import CartDAO from '../models/carts'
import UserDAO from "../models/user";
import generateToken from "../services/auth";
import logger from "../services/logger";
import { notifNewUser } from "../services/mailing";
import { apiCreateCart } from "../apis/cart";

export default class Auth {

  constructor() {}

  static login = async (req: Request, res: Response) => {

    try {

      const { mail, password } = req.body;

      // Verify if mail exist 
      const user = await UserDAO.verifyUser(mail);
      if (!user) {
        throw new Error("User not found");
      }
      
      // Validate credentials
      const validatePassword = bcrypt.compareSync(password, user.password);
      if (!validatePassword) {
        throw new Error("Invalid credentials");
      }

      // Generate token
      const token = generateToken(user);

      // Create new Cart (in case there is not allready created ) 
      const userMail = user.mail
      const cart = await CartDAO.getCart(userMail)
      if(!cart){
        await apiCreateCart(user.mail);
      }

      // Send Headers to client & Log

      logger.info(`New login - User:${user.mail}`);  
      res.header("auth-token", token).json({ msg: "Welcome" });

    } catch (err: any) {
      const errStatus = err.status || 401
      res.status(errStatus).json({msg: err.message});
      logger.info(`Error, ${err.message}`);
    }
  };

  static signup = async (req: Request, res: Response) => {
    try {
      const data = req.body;

      // Create new user
      const newUser = await UserDAO.createUser(data);

      // Send new user mail notification
      notifNewUser(data.mail, data.firstName);

      // Generate token
      const token = generateToken(newUser);

      // Send Headers
      res.header("auth-token", token).json({
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
