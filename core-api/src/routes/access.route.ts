import { Router } from "express";
import { AccessController } from "../controllers/access.controller";

function AccessRouter(): Router {
  const router = Router();

  /**
   * @swagger
   * tags:
   *   name: Access
   * definitions:
   *   CreateAccess:
   *     type: object
   *     properties:
   *       userId:
   *         type: number
   *       placeId:
   *         type: number
   *       permissionId:
   *         type: number
   *   Access:
   *     type: object
   *     properties:
   *       id:
   *         type: number
   *       user:
   *         $ref: '#/definitions/User'  
   *       place:
   *         $ref: '#/definitions/Place'  
   *       permission:
   *         $ref: '#/definitions/Permission'
   *   Accesses:
   *      type: array
   *      items:
   *          $ref: '#/definitions/Access'
   * /accesses:
   *   get:
   *     description: Get all accesses in database
   *     tags: [Access]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/Accesses'
   * /accesses/create:
   *   post:
   *     description: Create a new access in database
   *     tags: [Access]
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: access
   *         schema:
   *          $ref: '#/definitions/CreateAccess'
   *     responses:
   *       201:
   *         schema:
   *           $ref: '#/definitions/Accesses'
  */
  router.post("/create", AccessController.createAccess);
  router.get("/", AccessController.getAllAccesses);
  router.get("/:id", AccessController.getAccess);

  return router;
}

export default AccessRouter();
