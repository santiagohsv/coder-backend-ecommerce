import express from 'express';

import productController from '../controllers/product'
import {checkAuth} from '../middlewares/auth';

import multer from '../services/multer'


const router = express.Router();

router.get('/', productController.getProducts); // View products

router.get('/categories/:category', productController.getProductsByCategory); // View products by category

router.get('/:id', productController.getProductsById); // View product detail

router.post('/', checkAuth, multer.single('thumbnail') , productController.loadProduct); // Add product to dababase

router.put('/:id', checkAuth, productController.updateProduct) // Update products


export default router;

