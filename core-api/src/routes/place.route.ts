import { Router } from "express";
import { PlaceController } from "../controllers/place.controller";

function UserRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Places
     * definitions:
     *   Place:
     *     type: object
     *     properties:
     *       name:
     *         type: string
     *       address:
     *         type: string
     *       phone:
     *         type: number
     *       description:
     *         type: number
     *       softDeleted:
     *         type: boolean
     *       id:
     *         type: number
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *       accesses:
     *         type: array
     *         items:
     *             type: object
     *       checkoutSlots:
     *         type: array
     *         items:
     *             type: object
     */
    router.get("/", PlaceController.getAllPlaces);
    router.get("/:id", PlaceController.getPlace);
    router.get("/:id/meals", PlaceController.getPlaceMeals);
    router.get("/:id/checkout-slots", PlaceController.getCheckoutSlots);
    router.post("/create", PlaceController.createPlace);

    return router;
}

export default UserRouter();
