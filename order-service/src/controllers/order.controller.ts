import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/Messages";

export class OrderController {
    public static async createOrder(req: Request, res: Response) {
        const { userId, placeId, checkoutSlotId, statusId, items } = req.body;
        const numberParams = [userId, placeId, checkoutSlotId, statusId];
        const params = [...numberParams, items];

        if (params.filter(p => p === undefined).length > 0) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.order_data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        for (let param of numberParams) {
            if (isNaN(param)) {
                res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                    Messages.validation.id_must_be_number(param),
                    ErrorCode.NOT_ENOUGH_DATA,
                ).toJSON());

                return;
            }
        }

        if (items instanceof Array && items.length) {
            for (let item of items) {
                if (!item.mealId || !item.quantity) { // this also implies quantity can't be zero
                    res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                        Messages.validation.item_data_needs_to_be_provided,
                        ErrorCode.NOT_ENOUGH_DATA,
                    ).toJSON());

                    return;
                }
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.items_must_be_an_array,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newOrder = await OrderService.create(
                Number(userId),
                Number(placeId),
                Number(checkoutSlotId),
                items,
                Number(statusId)
            );
            res.status(HttpStatus.OK).json(newOrder);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }


    public static async getOrderById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("id"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const order = await OrderService.findById(id);

        if (!order) {
            res.status(HttpStatus.NOT_FOUND).json(new ServerError(
                Messages.order_not_found,
                ErrorCode.RECORD_NOT_FOUND
            ).toJSON());

            return;
        }

        res.json(order);
    }

    public static async getOrderByUserId(req: Request, res: Response) {
        const userId = req.params.userId;

        if (isNaN(userId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("userId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const permissions = await OrderService.findByUserId(userId);
        res.json(permissions);
    }

    public static async getOrderByPlaceId(req: Request, res: Response) {
        const placeId = req.params.placeId;

        if (isNaN(placeId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("placeId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const permissions = await OrderService.findByPlaceId(placeId);
        res.json(permissions);
    }

    public static async getOrderByStatus(req: Request, res: Response) {
        const statusId = req.params.statusId;

        if (isNaN(statusId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("statusId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        const permissions = await OrderService.findByStatus(statusId);
        res.json(permissions);
    }

    public static async getAllOrders(req: Request, res: Response) {
        const permissions = await OrderService.findAll();
        res.json(permissions);
    }

    public static async getItemsByOrderId(req: Request, res: Response) {
        const orderId = req.params.id;

        if (isNaN(orderId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("id"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        const order = await OrderService.findById(orderId);

        if (!order) {
            res.status(HttpStatus.NOT_FOUND).json(new ServerError(
                Messages.order_not_found,
                ErrorCode.RECORD_NOT_FOUND
            ).toJSON());

            return;
        }

        res.json(order.getItems());
    }

    public static async updateOrderStatus(req: Request, res: Response) {
        const orderId = req.params.id;
        const { statusId } = req.body;

        if (orderId === undefined || statusId === undefined) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.order_data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        for (let param of [orderId, statusId]) {
            if (isNaN(param)) {
                res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                    Messages.validation.id_must_be_number(param),
                    ErrorCode.NOT_ENOUGH_DATA,
                ).toJSON());

                return;
            }
        }

        try {
            const order = await OrderService.setOrderStatus(Number(orderId), Number(statusId));

            if (!order) {
                res.status(HttpStatus.NOT_FOUND).json(new ServerError(
                    Messages.order_not_found,
                    ErrorCode.RECORD_NOT_FOUND
                ).toJSON());

                return;
            }

            res.json(order);
        } catch (e) {
            res.status(HttpStatus.NOT_FOUND).json(new ServerError(e.message, e.code).toJSON());
        }
    }
}
