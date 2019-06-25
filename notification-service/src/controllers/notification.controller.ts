import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/Messages";

/**
 * @namespace Controllers
 * @class NotificationController
 */
export class NotificationController {
    public static async createNotification(req: Request, res: Response) {
        const { message, userId } = req.body;
        if (!message || !userId) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.notification_data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        if (isNaN(userId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("userId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        try {
            const newNotification = await NotificationService.create(message, Number(userId));
            res.status(HttpStatus.OK).json(newNotification);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async getNotificationById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("id"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const notification = await NotificationService.findById(id);
        res.json(notification);
    }

    public static async getNotificationByUserId(req: Request, res: Response) {
        const userId = req.params.userId;

        if (isNaN(userId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("userId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const notification = await NotificationService.findByUserId(userId);
        res.json(notification);
    }

    public static async getNotificationByUserIdNotPulled(req: Request, res: Response) {
        const userId = req.params.userId;

        if (isNaN(userId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("userId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const notification = await NotificationService.findByUserIdNotPulled(userId);
        res.json(notification);
    }

    public static async getAllNotifications(req: Request, res: Response) {
        const notifications = await NotificationService.findAll();
        res.json(notifications);
    }
}
