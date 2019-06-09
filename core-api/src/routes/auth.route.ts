import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

function AuthRouter(): Router {
    const router = Router();

    router.post("/signup", AuthController.signUp);
    // router.post("/login", AuthController.logIn);
    // router.post("/logout", AuthController.signUp);

    return router;
}

export default AuthRouter();
