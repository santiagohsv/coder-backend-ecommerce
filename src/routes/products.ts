import express from 'express';
import productController from '../controllers/product'
import {checkAuth} from '../middlewares/auth';

const router = express.Router();


router.get("/", productController.getProducts); // Listado de productos disponibles

router.get("/category/:category", productController.getProductsByCategory); // Listado de productos por categoría

router.get("/:id", productController.getProductsById); // Detalle de un producto

router.post("/", checkAuth, productController.loadProduct); // Agregar productos a la base de datos

router.put("/:id", checkAuth,  productController.updateProduct) // Actualizar productos


export default router;

