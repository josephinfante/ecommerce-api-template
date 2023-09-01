import { Product } from "../../domain/products/product";
import { ProductRepository } from "../../domain/products/product.repository";
import  productDAO from "./product.dao";

export class ProductRepositoryImpl implements ProductRepository {
    async save(product: Product): Promise<Product | null> {
        return productDAO.save(product);
    }
    async update(id: string, product: Product): Promise<Product | null> {
        return productDAO.update(id, product);
    }
    async delete(id: string): Promise<void> {
        return productDAO.delete(id);
    }
    async findAll(page: number): Promise<{products: Product[], total_products: number, total_pages: number, current_page: number} | null> {
        return productDAO.findAll(page);
    }
    async findById(id: string): Promise<Product | null> {
        return productDAO.findById(id);
    }
}