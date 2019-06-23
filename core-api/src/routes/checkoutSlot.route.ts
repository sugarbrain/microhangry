import { Router } from "express";
import { CheckoutSlotController } from "../controllers/checkoutSlot.controller";

function CheckoutSlotRouter(): Router {
    const router = Router();

    router.get("/", CheckoutSlotController.getSlots);
    router.post("/create", CheckoutSlotController.createSlot);

    return router;
}

export default CheckoutSlotRouter();
