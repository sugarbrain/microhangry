import { Router } from "express";
import { OrderController } from "../controllers/order.controller";


function OrderRouter(): Router {
    const router = Router();

    router.post("/create", OrderController.createOrder);
    router.get("/", OrderController.getAllOrders);
    router.get("/:id", OrderController.getOrderById);
    router.put("/:id", OrderController.updateOrderStatus);
    router.get("/user/:userId", OrderController.getOrderByUserId);
    router.get("/place/:placeId", OrderController.getOrderByPlaceId);
    router.get("/status/:status", OrderController.getOrderByStatus);
    router.get("/:id/items", OrderController.getItemsByOrderId);
    return router;
}

export default OrderRouter();
