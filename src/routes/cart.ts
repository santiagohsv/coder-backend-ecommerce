import express from 'express';

import cartController from '../controllers/cart';
import { checkAuth } from '../middlewares/auth';

const router = express.Router();

router.get('/', checkAuth, cartController.getCart ); // View cart 
router.put('/:productID', checkAuth, cartController.cartUpdate); // Add products to cart
router.post('/checkout', checkAuth,  cartController.checkOut); // Create order / checkout

// router.delete('/:cartId', deleteById); // ELIMINAR CARRITO POR ID // va a ser vaciar carrito !
// router.post('/', checkout); // CHECKOUT
// router.delete('/:cartId', deleteProduct); // ELIMINAR PRODUCTO 

export default router; 