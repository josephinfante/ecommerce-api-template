import { Product } from "./product";

export interface ProductRepository {
    save(product: Product): Promise<Product | null>;
    update(id: string, product: Product): Promise<Product | null>;
    delete(id: string): Promise<void>;
    findAll(page: number): Promise<{products: Product[], total_products: number, total_pages: number, current_page: number} | null>;
    findById(id: string): Promise<Product | null>;
}