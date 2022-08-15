import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

import MongoDB from '../services/mongodb';

export interface IUser {
  firstName: string;
  lastName: string;
  mail: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, require: true, max: 40 },
    lastName: { type: String, require: true, max: 40 },
    mail: { type: String, require: true, unique: true },
    password: { type: String, required: true },
  },

  { timestamps: true, versionKey: false }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});


export const UserModel = model("user", UserSchema);

class UserDAO {
  constructor() {
    MongoDB.getConnection();
  }

  getUsers = async (id?: string) => {
    if (id) {
      return await UserModel.findById(id);
    }
    return await UserModel.find();
  };

  verifyUser = async (data: string) => {
    return await UserModel.findOne({ mail: data });
  } 
  
  createUser = async (data: IUser) => {
    return await UserModel.create(data);
  };
}

export default new UserDAO();
