import { Request, Response } from 'express';
import {apiGetProducts, apiGetProductsByCategory, apiGetProductsById, apiLoadProduct } from '../apis/product';
import logger from '../services/logger';

export default class Products {

  constructor() {}

  static getProducts = async (_req: Request, res: Response) => {
    try {
      const products = await apiGetProducts()
      res.json(products)
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
    }
  };

  static getProductsById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const products = await apiGetProductsById(id)
      res.json(products)
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
      if(err.name ==='CastError' && err.kind === 'ObjectId'){
        res.status(404).json({msg : `El ID: ${err.value} no coincide con ningún producto`})
      }else{res.json(err.message)}
    }
  };

  static loadProduct = async (req: Request, res: Response) => {
    try{ 
      const data = req.body;
      await apiLoadProduct(data)
      res.json('Product added correctly')
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
    }
  };

  static getProductsByCategory = async (req : Request, res: Response) => {
    try {
      const { category } =  req.params;
      const products = await apiGetProductsByCategory(category);
      res.json(products)
    } catch (err: any) {
      logger.info(`Error, ${err.message}`);
    }
  };
  
}

