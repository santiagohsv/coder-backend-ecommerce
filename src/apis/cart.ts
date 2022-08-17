import CartDAO, { ICartProd } from "../models/carts";

export const apiCreateCart = (mail: string) => {
  return CartDAO.createCart(mail);
};

export const apiGetCart = (id: string) => {
  return CartDAO.getCart(id);
};

export const apiUpdateCart = (cartId: string,  products: ICartProd[]) => {
  return CartDAO.updateCart(cartId, products);
};

