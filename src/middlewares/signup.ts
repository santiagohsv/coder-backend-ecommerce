import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const userSchema = Joi.object({
  firstName: Joi.string()
  .required(),
  lastName: Joi.string()
  .required(),
  mail: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: false } })
  .required(),
  password: Joi.string()
  .alphanum()
  .min(4)
  .max(8)
  .required(),
  password2nd: Joi.ref('password'),
  admin: Joi.boolean()
  .default(false),
  address: Joi.string().required()
})

export default async function signupCheck(req: Request, res: Response, next: NextFunction){
  const data = req.body;

  const verify = userSchema.validate(data);

  if(!verify.error){
    next()
  } else {
    res.json({message: "Validation error", error: verify.error})
  }
  
}





  
