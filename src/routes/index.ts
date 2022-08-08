import express from 'express';

import productRouter from './products';
import cartRouter from './cart';
import homeRouter from './home';

const router = express.Router();

router.use('/api/productos', productRouter);
router.use('/api/carrito', cartRouter);
router.use('/', homeRouter)

router.use((_req,res) => {
    res.status(404).json({ msg : 'Error 404 / Page Not Found'});
});

export default router;

