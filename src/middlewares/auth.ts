import { Request, Response, NextFunction } from "express";
import  jwt from "jsonwebtoken";
import env from "../config/index";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers['auth-token']  as string
  if (!token) return res.status(401).json({ msg: 'Unauthorized' });
  try {
    const user = jwt.verify(token as string, env.JWT_KEY as string) as jwt.JwtPayload
    res.locals.user = user; 
    return next()  
  } catch (err : any) {
    return res.status(401).json({ msg:`${err?.message}`});
  }

};

