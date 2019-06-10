import { Router } from "express";
import { UserController } from "../controllers/user.controller";

function UserRouter(): Router {
    const router = Router();

    router.get("/", UserController.getAllUsers);
    router.get("/:id", UserController.getUser);

    return router;
}

export default UserRouter();
