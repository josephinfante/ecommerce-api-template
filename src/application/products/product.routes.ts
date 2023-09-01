import { Router } from "express";
import { ProductRepositoryImpl } from "../../infrastructure/products/product.repository.impl";
import { ProductCrudUseCase } from "./usecases/product-crud.usecase";
import { ProductController } from "./product.controller";
import { checkProduct, isIDPresent } from "./product.middleware";

const productRouter = Router();
const productRepositoryImpl = new ProductRepositoryImpl();
const productCrudUseCase = new ProductCrudUseCase(productRepositoryImpl);
const productController = new ProductController(productCrudUseCase);


productRouter.get("/v1/products",isIDPresent);
productRouter.put("/v1/products",isIDPresent);
productRouter.delete("/v1/products",isIDPresent);

productRouter.post("/v1/products", checkProduct, productController.save.bind(productController));
productRouter.put("/v1/products/:id", productController.update.bind(productController));
productRouter.delete("/v1/products/:id", productController.delete.bind(productController));
productRouter.get("/v1/all/products", productController.findAll.bind(productController));
productRouter.get("/v1/products/:id", productController.findById.bind(productController));

export { productRouter }