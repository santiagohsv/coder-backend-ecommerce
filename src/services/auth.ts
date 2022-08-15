import jwt from "jsonwebtoken";
import env from "../config";
import { IUser } from "../models/user";

const privateKey = env.JWT_KEY as string;

const generateToken = function (user: IUser): string {
  
  const data: { firstName: string; lastName: string; mail: string } = {
    firstName: user.firstName,
    lastName: user.lastName,
    mail: user.mail,
  };

  const token = jwt.sign(data, privateKey, {
    expiresIn: "4m",
  });

  return token;
};

export default generateToken;
