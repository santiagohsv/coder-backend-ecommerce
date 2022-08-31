import express from 'express';

import cartController from '../controllers/cart';
import { checkAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', checkAuth, cartController.getCart ); // View cart 
router.put('/:productID', checkAuth, cartController.cartUpdate); // Add products to cart
router.post('/checkout', checkAuth,  cartController.checkOut); // Create order / checkout
router.delete('/:productID', checkAuth, cartController.deleteProduct); // Delete products by ID 

export default router; 