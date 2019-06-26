import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service';

/**
 * @namespace Controllers
 * @class NotificationController
 */
export class NotificationController {
    public static async getAllNotifications(req: Request, res: Response) {
        const notifications = await NotificationService.findAllNotifications();
        return res.json(notifications);
    }

    public static async getNotificationsById(req: Request, res: Response) {
        const id = req.params.id;
        const notifications = await NotificationService.findById(id);
        return res.json(notifications);
    }

    public static async getNotificationsByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const notifications = await NotificationService.findByUserId(userId);
        return res.json(notifications);
    }

    public static async getNotificationsByUserIdNotPulled(req: Request, res: Response) {
        const userId = req.params.userId;
        const notifications = await NotificationService.findByUserIdNotPulled(userId);
        return res.json(notifications);
    }

    public static async createNotification(req: Request, res: Response) {
        const { message, userId } = req.body;
        const notifications = await NotificationService.create(message, userId);
        return res.json(notifications);
    }
} 