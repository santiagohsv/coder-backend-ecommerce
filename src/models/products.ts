import { Schema, model } from "mongoose";

import MongoDB from '../services/mongodb';

export interface IProduct {
  name: string;
  category: string;
  price: number;
  thumbnail: string;
  stock: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, require: true, max: 40 },
    category: { type: String,  required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    stock: { type: Number, required: false },
  },
  { timestamps: true, versionKey: false }
);


const ProductModel = model("product", ProductSchema);

class ProductDAO {

  constructor(){
    MongoDB.getConnection();
  }
  
  getProducts = async (id?: string) => {
    if(id){
      return await ProductModel.findById(id)      
    } 
    return await ProductModel.find()
  }

  getProductsByCategory = async (category : string) => {
    const data = await ProductModel.find({ category : category})
    return data  
  }

  loadProduct = async (data : IProduct) => {
    await ProductModel.create(data)
    return 'Products added'
  }
 }

export default new ProductDAO;

