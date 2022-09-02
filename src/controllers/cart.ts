import { Request, Response } from 'express';
 
import { apiGetCart, apiUpdateCart, apiEmptyCart } from '../apis/cart';
import { apiCheckOut } from '../apis/order';
import { apiGetProductsById } from '../apis/product';
import { notifNewOrder } from '../services/mailing'
import { ICartProd, ICart } from '../models/carts';
import { IProduct } from '../models/products';
import logger from '../services/logger';

export default class Cart {
  constructor() {}

  static getCart = async (_req: Request, res: Response) => {
    try {
      const user = res.locals.user;
      const cart = await apiGetCart(user.mail);
      res.json(cart);
    } catch (err: any) {
      res.json(err.message);
      logger.info(`Error, ${err.message}`);
    }
  };

  static cartUpdate = async (req: Request, res: Response) => {
    try {
      const { productID } = req.params;
      const user = res.locals.user;

      // Get product to add

      const product = (await apiGetProductsById(productID)) as IProduct;

      if (product.stock < 1) {
        throw new Error('Product out of stock');
      }

      const newProd: ICartProd = {
        name: product.name,
        price: product.price,
        qty: 1,
      };

      // Add new product to the cart

      const cart = (await apiGetCart(user.mail)) as ICart;
      const prodList: ICartProd[] = cart.productList as ICartProd[];
      prodList.push(newProd);

      // Update cart

      const cartId = cart._id.toString();

      await apiUpdateCart(cartId, prodList);

      res.json({msg: 'Product added to cart'})

    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res
          .status(400)
          .json({ msg: `There is no product with ID: ${err.value} ` });
      } else {
        res.json(err.message);
        logger.info(`Error, ${err.message}`);
      }
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    try {
      const { productID } = req.params;
      const user = res.locals.user;

      // Update product list by deleting de product with the particular ID

      const cart = (await apiGetCart(user.mail)) as ICart;
      const prodList: ICartProd[] = cart.productList as ICartProd[];
      const index = prodList.findIndex(
        (prod) => prod._id?.toString() === productID
      );
      prodList.splice(index, 1); // elimino producto

      // Update cart with new product list

      const cartId = cart._id.toString();

      await apiUpdateCart(cartId, prodList);

      res.json({ msg: "Product deleted" });
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      if (err.name === "CastError" && err.kind === "ObjectId") {
        res
          .status(400)
          .json({ msg: `There is no product with ID: ${err.value} ` });
      } else {
        res.json(err.message);
        logger.info(`Error, ${err.message}`);
      }
    }
  };

  static checkOut = async (_req: Request, res: Response) => {

    try {

      const user = res.locals.user;
  
      // Get user cart
      const cart = (await apiGetCart(user.mail)) as ICart;

      let orderTotal : number = 0;

      cart.productList.forEach(item => { orderTotal+=(item.price*item.qty)})
      
      const number = Math.floor(Math.random() * (100000) + 1) 

      // Create new Order

      await apiCheckOut(user.mail, number, cart.productList, orderTotal);

      notifNewOrder(user.mail, user.firstName, cart.productList)
      
      // Empty Cart
      const cartId = cart._id.toString();
      await apiEmptyCart(cartId)

      res.send({ msg : `Order number ${number} has been created`})

    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      res.json(err.message);
    }
  };
}
