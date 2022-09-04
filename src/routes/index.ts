import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

import infoRouter from './info';
import authRouter from './auth'
import productRouter from './products';
import cartRouter from './cart';
import chatRouter from './chat';

const router = express.Router();
const swaggerPath = path.resolve(process.cwd(), './swagger.yml');
const swaggerDoc = YAML.load(swaggerPath);

// API resourses
router.use('/api/auth', authRouter);
router.use('/api/products',  productRouter);
router.use('/api/cart', cartRouter);
router.use('/api/chat', chatRouter);
router.use('/api/info', infoRouter);

// API info and documentation
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

// Invalid URL handler
router.use((_req,res) => {
    res.status(404).json({ msg : 'Error 404 / Page Not Found'});
});

export default router;

