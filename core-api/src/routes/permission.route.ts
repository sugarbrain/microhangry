import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";


function PermissionRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Permissions
     * definitions:
     *   Permission:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       name:
     *         type: string
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *   CreatePermission:
     *     type: object
     *     properties:
     *       name:
     *         type: string
     *   Permissions:
     *      type: array
     *      items:
     *          $ref: '#/definitions/Permission'
     * /permissions:
     *   get:
     *     description: Get all permissions in database
     *     tags: [Permissions]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Permission'
     * /permissions/create:
     *   post:
     *     description: Create a new permissions in database
     *     tags: [Permissions]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: permission
     *         schema:
     *          $ref: '#/definitions/CreatePermission'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/Permission'
    */
    router.post("/create", PermissionController.createPermission);
    router.get("/", PermissionController.getAllPermissions);

    return router;
}

export default PermissionRouter();
