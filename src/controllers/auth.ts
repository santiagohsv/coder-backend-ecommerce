import bcrypt from "bcrypt";
import UserDAO from "../models/user";
import generateToken from "../services/auth";
import logger from "../services/logger";
import { Request, Response } from "express";

export default class Auth {
  constructor() {}

  static login = async (req: Request, res: Response) => {
    try {
      const { mail, password } = req.body;
      const user = await UserDAO.verifyUser(mail);
      if (!user) {
        throw new Error("User not found");
      }
      const validatePassword = bcrypt.compareSync(password, user.password);
      if (!validatePassword) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);
      logger.info(`New login - User:${user.mail}`);
      res.header("auth-token", token).json({ msg: "Welcome" });
    } catch (err: any) {
      res.send(`Error, ${err.message}`);
      logger.info(`Error, ${err.message}`);
    }
  };

  static signup = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const newUser = await UserDAO.createUser(data);
      const token = generateToken(newUser);
      logger.info(`New user: ${data.firstName} <${data.mail}>`);
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
