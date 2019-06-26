import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

function AuthRouter(): Router {
    const router = Router();
    /**
     * @swagger
     * tags:
     *   name: Auth
     * definitions:
     *   SignUp:
     *     type: object
     *     properties:
     *       name:
     *         type: string
     *       email:
     *         type: string
     *       password:
     *         type: string
     * /auth/signup:
     *   post:
     *     description: Create a new user in database
     *     tags: [Auth]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: signup
     *         schema:
     *          $ref: '#/definitions/SignUp'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/User'
     */
    router.post("/signup", AuthController.signUp);

    return router;
}

export default AuthRouter();
