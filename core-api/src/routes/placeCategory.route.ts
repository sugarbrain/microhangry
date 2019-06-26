import { Router } from "express";
import { PlaceCategoryController } from "../controllers/placeCategory.controller";


function PlaceCategoryRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: PlaceCategories
     * definitions:
     *   PlaceCategory:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       name:
     *         type: string
     *       places:
     *         type: array
     *         items:
     *           type: object
     *       softDeleted:
     *         type: boolean
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *   CreatePlaceCategory:
     *     type: object
     *     properties:
     *       name:
     *         type: string
     *   PlaceCategories:
     *      type: array
     *      items:
     *          $ref: '#/definitions/PlaceCategory'
     * /place-categories:
     *   get:
     *     description: Get all place categories in database
     *     tags: [PlaceCategories]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/PlaceCategory'
     * /place-categories/create:
     *   post:
     *     description: Create a new place category in database
     *     tags: [PlaceCategories]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: placeCategory
     *         schema:
     *          $ref: '#/definitions/CreatePlaceCategory'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/PlaceCategory'
     */
    router.post("/create", PlaceCategoryController.createPlaceCategory);
    router.get("/", PlaceCategoryController.getAllPlaceCategories);

    return router;
}

export default PlaceCategoryRouter();

