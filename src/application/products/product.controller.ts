import { Request, Response } from "express";
import { ProductCrudUseCase } from "./usecases/product-crud.usecase";
import ProductError from "../../infrastructure/shared/errors/product.error";

export class ProductController {
    private productCrudUseCase: ProductCrudUseCase;
    constructor(productCrudUseCase: ProductCrudUseCase) {
        this.productCrudUseCase = productCrudUseCase;
    }
    async save(req: Request, res: Response) {
        try {
            const product = await this.productCrudUseCase.save(req.body);
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof ProductError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const product = await this.productCrudUseCase.update(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            if (error instanceof ProductError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async delete(req: Request, res: Response) {
        try {
            await this.productCrudUseCase.delete(req.params.id);
            res.sendStatus(204);
        } catch (error) {
            if (error instanceof ProductError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const products = await this.productCrudUseCase.findAll(Number(req.query.page??1));
            res.status(200).json(products);
        } catch (error) {
            if (error instanceof ProductError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const product = await this.productCrudUseCase.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            if (error instanceof ProductError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
}