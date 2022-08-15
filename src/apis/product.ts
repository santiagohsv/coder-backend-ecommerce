import ProductDAO from '../models/products'
import { IProduct } from '../models/products'

export const  apiGetProducts =  () => {
    return ProductDAO.getProducts()
}

export const apiGetProductsById = (id : string) => {
    
    return ProductDAO.getProducts(id)
}

export const  apiLoadProduct =  (data : IProduct) => {
    return ProductDAO.loadProduct(data)
}

export const apiGetProductsByCategory = (data : string ) => {
    return ProductDAO.getProductsByCategory(data)
}