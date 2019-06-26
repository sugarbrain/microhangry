import { Router } from "express";
import { PlaceController } from "../controllers/place.controller";

function UserRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Places
     * definitions:
     *   CreatePlace:
     *     type: object
     *     properties:
     *       name:
     *         type: string
     *       categoryId:
     *         type: number
     *       address:
     *         type: string
     *       phone:
     *         type: string
     *       description:
     *         type: string
     *   Place:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       name:
     *         type: string
     *       category:
     *         $ref: '#/definitions/PlaceCategory'
     *       address:
     *         type: string
     *       phone:
     *         type: number
     *       description:
     *         type: number
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *       access:
     *         $ref: '#/definitions/Accesses'
     *       checkoutSlots:
     *         $ref: '#/definitions/CheckoutSlots'
     *   Places:
     *      type: array
     *      items:
     *          $ref: '#/definitions/Place'
     * /places:
     *   get:
     *     description: Get all places in database
     *     tags: [Places]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Places'
     * /places/{id}:
     *   get:
     *     description: Get a place in database by id
     *     tags: [Places]
     *     produces:
     *       - application/json
    *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: number
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Place'
     * /places/{id}/meals:
     *   get:
     *     description: Get all meals in database that bellows to a placeId
     *     tags: [Places]
     *     produces:
     *       - application/json
    *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: number
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Meals'
     * 
     * /places/{id}/checkout-slots:
     *   get:
     *     description: Get all checkoutSlots in database that bellows to a checkoutSlotId
     *     tags: [Places]
     *     produces:
     *       - application/json
    *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: number
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/CheckoutSlots'
     * /places/create:
     *   post:
     *     description: Create a new place in database
     *     tags: [Places]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: place
     *         schema:
     *          $ref: '#/definitions/CreatePlace'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/Place'
     */
    router.get("/", PlaceController.getAllPlaces);
    router.get("/:id", PlaceController.getPlace);
    router.get("/:id/meals", PlaceController.getPlaceMeals);
    router.get("/:id/checkout-slots", PlaceController.getCheckoutSlots);
    router.post("/create", PlaceController.createPlace);

    return router;
}

export default UserRouter();
