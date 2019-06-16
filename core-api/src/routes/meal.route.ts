import { Router } from "express";
import { MealController } from "../controllers/meal.controller";


function MealRouter(): Router {
    const router = Router();

    router.post("/create", MealController.createMeal);
    router.get("/", MealController.getAllMeals);

    return router;
}

export default MealRouter();
