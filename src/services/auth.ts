import jwt from 'jsonwebtoken';
import env from '../config';
import { IUser } from '../models/user';

const privateKey : string = env.JWT_KEY ;
const time : string = env.JWT_TIME; 

const generateToken = function (user: IUser): string {
  
  const data: { firstName: string; lastName: string; mail: string; admin : boolean } = {
    firstName: user.firstName,
    lastName: user.lastName,
    mail: user.mail,
    admin : user.admin
  };

  const token = jwt.sign(data, privateKey, {
    expiresIn: time,
  });

  return token;
};

export default generateToken;
