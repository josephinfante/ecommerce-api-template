import express, { Application } from "express";
import cors from "cors";
import { ACEPTED_ORIGINS } from "../config";
import { productRouter } from "./application/products/product.routes";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (ACEPTED_ORIGINS.includes(origin)) {
            callback(null, true)
            return;
        }
        return callback(new Error('Not allowed by CORS'))
    }
}));
app.disable('x-powered-by');

app.use("/api", productRouter);
app.use("/", (_req, res) => res.status(404));