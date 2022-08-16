import { Request, Response } from "express";
import {
  apiGetProducts,
  apiGetProductsByCategory,
  apiGetProductsById,
  apiLoadProduct,
  apiUpdateProduct,
} from "../apis/product";
import logger from "../services/logger";

export default class Products {
  constructor() {}

  static getProducts = async (_req: Request, res: Response) => {
    try {
      const products = await apiGetProducts();
      res.json(products);
    } catch (err: any) {
      res.json(err.message);
      logger.info(`Error, ${err.message}`);
    }
  };

  static getProductsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const products = await apiGetProductsById(id);
      res.json(products);
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      if (err.name === "CastError" && err.kind === "ObjectId") {
        res
          .status(404)
          .json({ msg: `There is no product with ID: ${err.value} ` });
      } else {
        res.json(err.message);
      }
    }
  };

  static loadProduct = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const user = res.locals.user;
      if (user.admin) {
        await apiLoadProduct(data);
        res.json({ msg: "Product added correctly" });
      } else {
        res.status(401).json({ msg: "Unauthorized" });
      }
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      res.json(err.message);
    }
  };

  static updateProduct = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = res.locals.user;

      if (user.admin) {
        await apiUpdateProduct(id, data);
        res.json({ msg: "Product updated correctly" });
      } else {
        res.status(401).json({ msg: "Unauthorized" });
      }
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      res.json(err.message);
    }
  };

  static getProductsByCategory = async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const products = await apiGetProductsByCategory(category);
      res.json(products);
    } catch (err: any) {
      res.json(err.message);
      logger.info(`Error, ${err.message}`);
    }
  };
}
