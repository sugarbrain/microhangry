import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";


function NotificationRouter(): Router {
    const router = Router();

    router.post("/create", NotificationController.createNotification);
    router.get("/", NotificationController.getAllNotifications);
    router.get("/:id", NotificationController.getNotificationById);
    router.get("/users/:userId", NotificationController.getNotificationByUserId);
    return router;
}

export default NotificationRouter();
