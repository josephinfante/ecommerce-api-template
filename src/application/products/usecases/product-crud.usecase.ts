import { Product } from "../../../domain/products/product";
import { ProductRepository } from "../../../domain/products/product.repository";

export class ProductCrudUseCase {
    constructor(private productRepository: ProductRepository) {}
    async save(product: Product): Promise<Product | null> {
        const new_product = new Product(product);
        return await this.productRepository.save(new_product);
    }
    async update(id: string, product: Product): Promise<Product | null> {
        const updated_product = new Product(product);
        return await this.productRepository.update(id, updated_product);
    }
    async delete(id: string): Promise<void> {
        return await this.productRepository.delete(id);
    }
    async findAll(page: number): Promise<{products: Product[], total_products: number, total_pages: number, current_page: number} | null> {
        return await this.productRepository.findAll(page);
    }
    async findById(id: string): Promise<Product | null> {
        return await this.productRepository.findById(id);
    }
}