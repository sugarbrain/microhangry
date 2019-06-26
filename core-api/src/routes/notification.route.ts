import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";

function NotificationRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Notifications
     * definitions:
     *   Notification:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       message:
     *         type: string
     *       userId:
     *         type: number
     *       pulled:
     *         type: boolean
     *   CreateNotification:
     *     type: object
     *     properties:
     *       message:
     *         type: string
     *       userId:
     *         type: number
     *   Notifications:
     *      type: array
     *      items:
     *          $ref: '#/definitions/Notification'
     * /notifications:
     *   get:
     *     description: Get all notifications in database
     *     tags: [Notifications]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Notifications'
     * /notifications/{id}:
     *   get:
     *     description: Get a notification in database by id
     *     tags: [Notifications]
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
     *           $ref: '#/definitions/Notification'
     * /notifications/users/{userId}:
     *   get:
     *     description: Get a preferences list in database by userId
     *     tags: [Notifications]
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
     *           $ref: '#/definitions/Notifications'
     * /notifications/unseen/users/{userId}:
     *   get:
     *     description: Get a preferences list of unseen messages in database by userId
     *     tags: [Notifications]
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
     *           $ref: '#/definitions/Notifications'
     * /notifications/create:
     *   post:
     *     description: Create a new notification in database
     *     tags: [Notifications]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: notification
     *         schema:
     *          $ref: '#/definitions/CreateNotification'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/Notification'
     */
    router.post("/create", NotificationController.createNotification);
    router.get("/", NotificationController.getAllNotifications);
    router.get("/:id", NotificationController.getNotificationsById);
    router.get("/users/:userId", NotificationController.getNotificationsByUserId);
    router.get("/unseen/users/:userId", NotificationController.getNotificationsByUserIdNotPulled);
    return router;
}

export default NotificationRouter(); 