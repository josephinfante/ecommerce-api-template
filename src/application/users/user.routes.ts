import { Router } from "express";
import { UserRepositoryImpl } from "../../infrastructure/user/user.repository.impl";
import { UserCrudUseCase } from "./usecases/user-crud.usecase";
import { UserAuthUseCase } from "./usecases/user-auth.usecase";
import { UserController } from "./user.controller";
import { checkUser, isIDPresent } from "./user.middleware";

const userRouter = Router();
const userRepositoryImpl = new UserRepositoryImpl();
const userCrudUseCase = new UserCrudUseCase(userRepositoryImpl);
const userAuthUseCase = new UserAuthUseCase(userRepositoryImpl);
const userController = new UserController(userCrudUseCase, userAuthUseCase);

userRouter.get("/v1/users",isIDPresent);
userRouter.put("/v1/users",isIDPresent);
userRouter.delete("/v1/users",isIDPresent);

userRouter.post("/v1/users", checkUser, userController.save.bind(userController));
userRouter.put("/v1/users/:id", userController.update.bind(userController));
userRouter.delete("/v1/users/:id", userController.delete.bind(userController));
userRouter.get("/v1/all/users", userController.findAll.bind(userController));
userRouter.get("/v1/users/:id", userController.findById.bind(userController));
userRouter.get("/v1/users/email/:email", userController.findByEmail.bind(userController));

userRouter.post("/v1/users/login", userController.login.bind(userController));

export { userRouter };