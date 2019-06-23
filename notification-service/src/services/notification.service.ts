import db from "../config/database";
import { Notification } from "../entities/notification.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";

/**
 * @namespace Services
 * @class NotificationService
 */
export class NotificationService {
    /**
     * Create notification in database
     * 
     * @param message
     * @param userId
     */
    public static async create(message: string, userId: number): Promise<Notification | Error> {
        const repository = db.getRepository(Notification);
        const newNotification = new Notification(message, userId);

        await this.validateFields(newNotification);

        try {
            await repository.save(newNotification)
            return newNotification;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newNotification: Notification): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newNotification);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

    }

    public static async findById(id: number): Promise<Notification> {
        const repository = db.getRepository(Notification);

        try {
            const notification = await repository.findOne(id);
            return notification;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByUserId(userId: number): Promise<Notification[]> {
        const repository = db.getRepository(Notification);

        try {
            const notifications = await repository.find({ userId: userId });
            return notifications;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<Notification[]> {
        const repository = db.getRepository(Notification);

        try {
            const notifications = await repository.find();
            return notifications;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

}