import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

function OrderRouter(): Router {
    const router = Router();

    router.post("/create", OrderController.createOrder);
    router.get("/", OrderController.getAllOrders);
    router.get("/:orderId", OrderController.getOrderById);
    router.put("/:orderId", OrderController.updateOrderStatus);
    router.get("/user/:userId", OrderController.getOrderByUserId);
    router.get("/place/:placeId", OrderController.getOrderByPlaceId);
    router.get("/status/:statusId", OrderController.getOrderByStatusId);
    router.get("/:orderId/items", OrderController.getOrderItems);

    return router;
}

export default OrderRouter();
