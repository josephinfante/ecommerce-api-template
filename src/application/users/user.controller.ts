import { Request, Response } from "express";
import { UserAuthUseCase } from "./usecases/user-auth.usecase";
import { UserCrudUseCase } from "./usecases/user-crud.usecase";
import UserError from "../../infrastructure/shared/errors/user.error";

export class UserController {
    private userCrudUseCase: UserCrudUseCase;
    private userAuthUseCase: UserAuthUseCase;
    constructor(userCrudUseCase: UserCrudUseCase, userAuthUseCase: UserAuthUseCase) {
        this.userCrudUseCase = userCrudUseCase;
        this.userAuthUseCase = userAuthUseCase;
    }
    async save(req: Request, res: Response) {
        try {
            const user = await this.userCrudUseCase.save(req.body);
            res.status(201).json(user);
        }   catch (error) {
            if (error instanceof UserError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async update(req: Request, res: Response) {
        try {
            const user = await this.userCrudUseCase.update(req.params.id, req.body);
            res.status(200).json(user);
        }   catch (error) {
            if (error instanceof UserError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async delete(req: Request, res: Response) {
        try {
            await this.userCrudUseCase.delete(req.params.id);
            res.sendStatus(204);
        }   catch (error) {
            if (error instanceof UserError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async findAll(req: Request, res: Response) {
        try {
            const users = await this.userCrudUseCase.findAll(Number(req.query.page??1));
            res.status(200).json(users);
        }   catch (error) {
            if (error instanceof UserError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async findById(req: Request, res: Response) {
        try {
            const user = await this.userCrudUseCase.findById(req.params.id);
            res.status(200).json(user);
        }   catch (error) {
            if (error instanceof UserError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async findByEmail(req: Request, res: Response) {
        try {
            const user = await this.userCrudUseCase.findByEmail(req.params.email);
            res.status(200).json(user);
        }   catch (error) {
            if (error instanceof UserError) res.status(500).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
    async login(req: Request, res: Response) {
        try {
            const user = await this.userAuthUseCase.login(req.body.email, req.body.password);
            res.status(200).json(user);
        }   catch (error) {
            if (error instanceof UserError) res.status(401).json({ error: error.message });
            else res.status(500).json({ error: "Internal server error" });
        }
    }
}