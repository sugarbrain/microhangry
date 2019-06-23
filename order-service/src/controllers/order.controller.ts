import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/Messages";

export class OrderController {
    public static async createOrder(req: Request, res: Response) {
        const { userId, placeId, checkoutSlotId, statusId } = req.body;
        if (!userId || !placeId || !checkoutSlotId || !statusId) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.order_data_needs_to_be_provided,
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

        if (isNaN(placeId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("placeId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        if (isNaN(checkoutSlotId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("checkoutSlotId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        if (isNaN(statusId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("statusId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        try {
            const newOrder = await OrderService.create(Number(userId), Number(placeId), Number(checkoutSlotId), Number(statusId));
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

        const permissions = await OrderService.findById(id);
        res.json(permissions);
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
        }

        const permissions = await OrderService.findByPlaceId(statusId);
        res.json(permissions);
    }

    public static async getAllOrders(req: Request, res: Response) {
        const permissions = await OrderService.findAll();
        res.json(permissions);
    }
}
