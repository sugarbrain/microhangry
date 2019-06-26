import { Router } from "express";
import { MealController } from "../controllers/meal.controller";


function MealRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Meals
     * definitions:
     *   CreateMeal:
     *     type: object
     *     properties:
     *       name:
     *         type: string
     *       description:
     *         type: string
     *       placeId:
     *         type: number         
     *       price:
     *         type: number
     *   Meal:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       name:
     *         type: string
     *       description:
     *         type: string
     *       place:
     *         $ref: '#/definitions/Place'  
     *       price:
     *         type: number
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *   Meals:
     *      type: array
     *      items:
     *          $ref: '#/definitions/Meal'
     * /meals:
     *   get:
     *     description: Get all meals in database
     *     tags: [Meals]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Meals'
     * /meals/create:
     *   post:
     *     description: Create a new meal in database
     *     tags: [Meals]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: meal
     *         schema:
     *          $ref: '#/definitions/CreateMeal'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/Meal'
     */
    router.post("/create", MealController.createMeal);
    router.get("/", MealController.getAllMeals);

    return router;
}

export default MealRouter();
