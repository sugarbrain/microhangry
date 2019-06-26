import { Router } from "express";
import { UserController } from "../controllers/user.controller";

function UserRouter(): Router {
    const router = Router();
    /**
     * @swagger
     * tags:
     *   name: Users
     * definitions:
     *   User:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       name:
     *         type: string
     *       email:
     *         type: string
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *   Users:
     *      type: array
     *      items:
     *          $ref: '#/definitions/User'
     * /users:
     *   get:
     *     description: Get all users in database
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Users'
     * /users/{id}:
     *   get:
     *     description: Get an user by id
     *     tags: [Users]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: string
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/User'
     */
    router.get("/", UserController.getAllUsers);
    router.get("/:id", UserController.getUser);

    return router;
}

export default UserRouter();
