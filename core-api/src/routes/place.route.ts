import { Router } from "express";
import { PlaceController } from "../controllers/place.controller";

function UserRouter(): Router {
    const router = Router();

    router.get("/", PlaceController.getAllPlaces);
    router.get("/:id", PlaceController.getPlace);
    router.get("/:id/meals", PlaceController.getPlaceMeals);
    router.get("/:id/checkout-slots", PlaceController.getCheckoutSlots);
    router.post("/create", PlaceController.createPlace);

    return router;
}

export default UserRouter();
