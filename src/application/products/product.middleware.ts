import { NextFunction, Request, Response } from "express";

const isIDPresent = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    next();
}

const checkProduct = (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, stock } = req.body;
    if (!name || !description || !price || !stock) {
        res.status(400).json({ error: "Name, description, price and stock are required" });
        return;
    }
    next();
}

export { isIDPresent, checkProduct }