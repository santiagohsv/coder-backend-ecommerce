import OrdersDAO from '../models/orders'

import { ICartProd } from '../models/carts';

export const apiGetOrder = (mail: string) => {
  return OrdersDAO.getOrder(mail);
};

export const apiCheckOut = (mail: string,  orderNumber: number, productList : ICartProd[], orderTotal: number) => {
  return OrdersDAO.createOrder(mail, orderNumber, productList, orderTotal)
};
