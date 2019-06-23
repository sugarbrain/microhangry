import db from "../config/database";
import { Order } from "../entities/order.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/Messages";

/**
 * @namespace Services
 * @class OrderService
 */
export class OrderService {
    /**
     * Create order in database
     * 
     * @param userId
     * @param placeId
     * @param checkoutSlotId
     * @param status
     */
    public static async create(userId: number, placeId: number, checkoutSlotId: number, statusId: number): Promise<Order | Error> {
        const repository = db.getRepository(Order);
        const newOrder = new Order(userId, placeId, checkoutSlotId, statusId);

        await this.validateFields(newOrder);

        try {
            await repository.save(newOrder)
            return newOrder;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newOrder: Order): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newOrder);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

    }

    public static async findById(id: number): Promise<Order> {
        const repository = db.getRepository(Order);

        try {
            const order = await repository.findOne(id);
            return order;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByUserId(userId: number): Promise<Order[]> {
        const repository = db.getRepository(Order);

        try {
            const orders = await repository.find({ userId: userId });
            return orders;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByPlaceId(placeId: number): Promise<Order[]> {
        const repository = db.getRepository(Order);

        try {
            const orders = await repository.find({ placeId: placeId });
            return orders;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByStatus(statusId: number): Promise<Order[]> {
        const repository = db.getRepository(Order);

        try {
            const orders = await repository.find({ statusId: statusId });
            return orders;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<Order[]> {
        const repository = db.getRepository(Order);

        try {
            const orders = await repository.find();
            return orders;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

}