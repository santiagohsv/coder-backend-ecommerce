import bcrypt from "bcrypt";
import UserDAO from "../models/user";
import { IUser } from "../models/user";

export const apiGetUser = async (mail: string) => {
  return await UserDAO.getUser(mail);
};

export const apiValidateCredentials = async (
    password: string,
    userPassword: string) => {

  return bcrypt.compareSync(password, userPassword)

};

export const apiCreateUser = async (data: IUser) => {
  return await UserDAO.createUser(data);
};

