import { ProductEntity } from "./product.entity";

export class Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    created_at: string;
    updated_at: string;
    constructor(product: ProductEntity) { 
        this._id = product._id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.images = product.images;
        this.created_at = product.created_at;
        this.updated_at = product.updated_at;
    }
}