import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";

function NotificationRouter(): Router {
    const router = Router();

    router.post("/create", NotificationController.createNotification);
    router.get("/", NotificationController.getAllNotifications);
    router.get("/:id", NotificationController.getNotificationsById);
    router.get("/users/:userId", NotificationController.getNotificationsByUserId);
    router.get("/unseen/users/:userId", NotificationController.getNotificationsByUserIdNotPulled);
    return router;
}

export default NotificationRouter(); 