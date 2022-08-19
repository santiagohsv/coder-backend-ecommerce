import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import productRouter from './products';
import cartRouter from './cart';
import authRouter from './auth'
import homeRouter from './home';

const router = express.Router();
const swaggerPath = path.resolve(process.cwd(), './swagger.yml');
const swaggerDoc = YAML.load(swaggerPath);

// API resourses
router.use('/', homeRouter);
router.use('/auth', authRouter);
router.use('/api/productos',  productRouter);
router.use('/api/carrito', cartRouter);

// API documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

// Invalid URL handler
router.use((_req,res) => {
    res.status(404).json({ msg : 'Error 404 / Page Not Found'});
});

export default router;

