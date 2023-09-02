import { NextFunction, Request, Response } from "express";

const isIDPresent = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({ error: "ID is required" });
        return;
    }
    next();
}

const checkUser = (req: Request, res: Response, next: NextFunction) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
        res.status(400).json({ error: "first_name, last_name, email and password are required" });
        return;
    }
    next();
}

export { isIDPresent, checkUser }