import CartDAO, { ICartProd } from '../models/carts';
import OrdersDAO from '../models/orders'

export const apiCreateCart = (mail: string) => {
  return CartDAO.createCart(mail);
};

export const apiGetCart = (id: string) => {
  return CartDAO.getCart(id);
};

export const apiUpdateCart = (cartId: string,  products: ICartProd[]) => {
  return CartDAO.updateCart(cartId, products);
};

export const apiCheckOut = (mail: string,  orderNumber: number, productList : ICartProd[], orderTotal: number) => {
  return OrdersDAO.createOrder(mail, orderNumber, productList, orderTotal)
};


export const apiEmptyCart = (cartId: string) => {
  return CartDAO.emptyCart(cartId)
};
