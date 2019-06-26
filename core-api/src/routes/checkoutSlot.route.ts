import { Router } from "express";
import { CheckoutSlotController } from "../controllers/checkoutSlot.controller";

function CheckoutSlotRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: CheckoutSlots
     * definitions:
     *   CheckoutSlot:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       start:
     *         type: Date
     *       end:
     *         type: Date
     *       place:
     *         $ref: '#/definitions/Place'
     *       softDeleted:
     *         type: boolean
     *       createdAt:
     *         type: string
     *       updatedAt:
     *         type: string
     *   CreateCheckoutSlot:
     *     type: object
     *     properties:
     *       placeId:
     *         type: number
     *       start:
     *         type: string
     *         format: date-time
     *       end:
     *         type: string
     *         format: date-time
     *   CheckoutSlots:
     *      type: array
     *      items:
     *          $ref: '#/definitions/CheckoutSlot'
     * /checkout-slots:
     *   get:
     *     description: Get all checkout slots in database
     *     tags: [CheckoutSlots]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/CheckoutSlot'
     * /checkout-slots/create:
     *   post:
     *     description: Create a new checkout slot in database
     *     tags: [CheckoutSlots]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: checkoutSlot
     *         schema:
     *          $ref: '#/definitions/CreateCheckoutSlot'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/CheckoutSlot'
     */
    router.get("/", CheckoutSlotController.getSlots);
    router.post("/create", CheckoutSlotController.createSlot);

    return router;
}

export default CheckoutSlotRouter();
