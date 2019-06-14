import { Router } from "express";
import { PlaceCategoryController } from "../controllers/placeCategory.controller";


function PlaceCategoryRouter(): Router {
    const router = Router();

    router.post("/create", PlaceCategoryController.createPlaceCategory);
    router.get("/", PlaceCategoryController.getAllPlaceCategories);

    return router;
}

export default PlaceCategoryRouter();

