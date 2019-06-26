import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

function OrderRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Orders
     * definitions:
     *   Order:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       userId:
     *         type: number
     *       placeId:
     *         type: number
     *       checkoutSlotId:
     *         type: number
     *       statusId:
     *         type: number
     *       items:
     *         type: array
     *         items:
     *          $ref: '#/definitions/OrderItem'
     *   CreateOrder:
     *     type: object
     *     properties:
     *       userId:
     *         type: number
     *       placeId:
     *         type: number
     *       checkoutSlotId:
     *         type: number
     *       statusId:
     *         type: number
     *       items:
     *         $ref: '#/definitions/OrderItems'
     *   Orders:
     *      type: array
     *      items:
     *          $ref: '#/definitions/Order'
     *   OrderItem:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       mealId:
     *         type: number
     *       quantity:
     *         type: number
     *   OrderItems:
     *      type: array
     *      items:
     *          $ref: '#/definitions/OrderItem'
     * /orders:
     *   get:
     *     description: Get all orders in database
     *     tags: [Orders]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Orders'
     * /orders/{id}:
     *   get:
     *     description: Get a order in database by id
     *     tags: [Orders]
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
     *           $ref: '#/definitions/Order'
     *   put:
     *     description: Update order status in database by id
     *     tags: [Orders]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: number
     *         required: true
     *       - in: body
     *         name: statusId
     *         schema:
     *          type: object
     *          properties:
     *              statusId:
     *                  type: number
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/Order'
    * /orders/user/{userId}:
    *   get:
    *     description: Get a order list in database by userId
    *     tags: [Orders]
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: userId
    *         schema:
    *          type: number
    *         required: true
    *     responses:
    *       200:
    *         schema:
    *           $ref: '#/definitions/Orders'
    * /orders/place/{placeId}:
    *   get:
    *     description: Get a orders list in database by placeId
    *     tags: [Orders]
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: placeId
    *         schema:
    *          type: number
    *         required: true
    *     responses:
    *       200:
    *         schema:
    *           $ref: '#/definitions/Orders'
    * /orders/status/{statusId}:
    *   get:
    *     description: Get a orders list in database by statusId
    *     tags: [Orders]
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: path
    *         name: statusId
    *         schema:
    *          type: number
    *         required: true
    *     responses:
    *       200:
    *         schema:
    *           $ref: '#/definitions/Orders'
    * /orders/{id}/items:
    *   get:
    *     description: Get a orders item list in database by id
    *     tags: [Orders]
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
    *           $ref: '#/definitions/OrderItems'
    * /orders/create:
    *   post:
    *     description: Create a new order in database
    *     tags: [Orders]
    *     produces:
    *       - application/json
    *     parameters:
    *       - in: body
    *         name: order
    *         schema:
    *          $ref: '#/definitions/CreateOrder'
    *     responses:
    *       201:
    *         schema:
    *           $ref: '#/definitions/Order'
     */
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
