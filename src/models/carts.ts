import { Schema, model, ObjectId } from 'mongoose';
import MongoDB from '../services/mongodb';


// Cart product interface

export interface ICartProd {
  name : string,
  price: number, 
  qty: number
}

// Cart interface 

export interface ICart {
    _id: ObjectId;
    customer: string;
    productList: ICartProd[]
}

// Cart Schema 

const CartSchema = new Schema<ICart>(
  { 
    customer : {type: String, required : true, unique:true},
    productList: { type: [{name: String, price: Number, qty: Number}], require: true},
  },
  { timestamps: true, versionKey:false }
);


const CartModel = model('cart', CartSchema)

class CartDAO {

  constructor() {
    MongoDB.getConnection();
  }

  createCart = async (mail:string) =>  await CartModel.create({customer: mail, productList: []});

  getCart = async (mail: string) => await CartModel.findOne({mail : mail});

  updateCart = async (cartID: string, products: ICartProd[]) => await CartModel.findByIdAndUpdate(cartID, {productList : products});

  emptyCart = async ( cartID: string  ) => await CartModel.findByIdAndUpdate(cartID, {productList : []});
}
  
  export default new CartDAO;
  