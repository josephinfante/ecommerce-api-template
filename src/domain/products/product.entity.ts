export interface ProductEntity {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    created_at: string;
    updated_at: string;
}