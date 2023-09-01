import { Collection, Db } from "mongodb";
import { Product } from "../../domain/products/product";
import { ProductEntity } from "../../domain/products/product.entity";
import connect from "../shared/connections/database/mongo";
import ProductError from "../shared/errors/product.error";
import { generateUniqueUUID } from "../shared";

class ProductDAO {
    private collectionName: string = 'products';
    private async getCollection(): Promise<Collection<ProductEntity>> {
        const db: Db = await connect();
        return db.collection(this.collectionName);
    }
    async save(product: Product) {
        const collection: Collection<ProductEntity> = await this.getCollection();
        let new_product: ProductEntity = {
            _id: '',
            name: '',
            description: '',
            price: 0,
            stock: 0,
            images: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }
        let isUnique: boolean = false;
        try {
            while (!isUnique) {
                const new_id = generateUniqueUUID();
                new_product = {
                    _id: new_id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    images: product.images ?? [],
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
                try {
                    await collection.insertOne(new_product);
                    isUnique = true;
                } catch (error) {
                    if (error instanceof Error && error.message && error.message.includes("duplicate key error")) isUnique = false;
                    else throw new ProductError("Error saving the product.");
                }
            }
        } catch (error) {
            if (error instanceof Error && error.message) throw new ProductError(error.message);
            else throw new ProductError("Error creating the product.");
        }
        return new_product;
    }
    async update(id: string, product: Product) {
        try {
            const product_result = await this.findById(id);
            if (!product_result) throw new ProductError(`No product found with ID ${id}`);

            const collection: Collection<ProductEntity> = await this.getCollection();
            const updated_product: ProductEntity = {
                _id: product_result._id,
                name: product.name ?? product_result.name,
                description: product.description ?? product_result.description,
                price: product.price ?? product_result.price,
                stock: product.stock ?? product_result.stock,
                images: product.images ?? product_result.images,
                created_at: product_result.created_at,
                updated_at: new Date().toISOString()
            }
            await collection.updateOne({ _id: id }, { $set: updated_product });
            return updated_product;
        } catch (error) {
            if (error instanceof Error && error.message) throw new ProductError(error.message);
            else throw new ProductError("Error updating the product.");
        }
    }
    async delete(id: string) {
        try {
            const product_result = await this.findById(id);
            if (!product_result) throw new ProductError(`No product found with ID ${id}`);

            const collection: Collection<ProductEntity> = await this.getCollection();
            await collection.deleteOne({ _id: id });
        } catch (error) {
            if (error instanceof Error && error.message) throw new ProductError(error.message);
            else throw new ProductError("Error deleting the product.");
        }
    }
    async findAll(page: number) {
        try {
            const collection: Collection<ProductEntity> = await this.getCollection();
            const products = await collection.find().sort({ created_at: -1 }).skip((page - 1) * 50).limit(50).toArray();
            const total_products = await collection.countDocuments();
            const total_pages = Math.ceil(total_products / 50);
            const current_page = page;
            return { products, total_products, total_pages, current_page };
        } catch (error) {
            if (error instanceof Error && error.message) throw new ProductError(error.message);
            else throw new ProductError("Error finding the product.");
        }
    }
    async findById(id: string) {
        try {
            const collection: Collection<ProductEntity> = await this.getCollection();
            const product = await collection.findOne({ _id: id });
            if (!product) throw new ProductError(`No product found with ID ${id}`);
            return product;
        } catch (error) {
            if (error instanceof Error && error.message) throw new ProductError(error.message);
            else throw new ProductError("Error finding the product.");
        }
    }
}

const productDAO = new ProductDAO();
export default productDAO;