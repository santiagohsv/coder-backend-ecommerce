import { Request, Response, NextFunction } from 'express';
import { apiGetUser, apiValidateCredentials } from '../apis/user';
import { IUser } from '../models/user';

export default async function verifyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { mail, password } = req.body;

  // Verify that user mail exist and check password

  const user = (await apiGetUser(mail)) as IUser;

  if (!user) {
    return res.status(401).json({ msg: 'User not found' });
  }

  const validatePassword = await apiValidateCredentials(
    password,
    user.password
  );

  if (!validatePassword) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  return next();
}
