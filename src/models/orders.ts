import { Schema, model } from "mongoose";
import MongoDB from "../services/mongodb";

// Product interface

export interface ICartProd {
  name: string;
  price: number;
  qty: number;
}

// Order interface

export interface IOrder {
  customer?: string;
  status: string;
  orderNumber: number;
  productList: ICartProd[];
  orderTotal: number
}

// Order Schema

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: Number, required: true, unique: true },
    customer: { type: String, required: true},
    status: { type: String, required: true, default: "Generated" },
    productList: { 
      type: [{ name: String, price: Number, qty: Number }],
      require: true,
    },
    orderTotal : { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const OrdersModel = model("order", OrderSchema);

class OrdersDAO {
  constructor() {
    MongoDB.getConnection();
  }

  createOrder = async (mail: string,orderNumber: number,productList: ICartProd[], orderTotal: number) => {
    await OrdersModel.create({orderNumber: orderNumber, customer: mail, productList: productList, orderTotal: orderTotal});
  }

  getOrder = async (mail: string)  => {
    return await OrdersModel.find({ mail: mail});
  }

}

export default new OrdersDAO();
