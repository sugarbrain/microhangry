import { Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";
import { CheckoutSlotService } from "../services/checkoutSlot.service";

export class CheckoutSlotController {

    public static async getSlots(req: Request, res: Response) {
        const slots = await CheckoutSlotService.findAll();
        if (!slots) {
            res.status(HttpStatus.NOT_FOUND).json(new ServerError(
                Messages.place_not_found,
                ErrorCode.RECORD_NOT_FOUND
            ).toJSON());

            return;
        }
        res.json(slots);
    }

    public static async createSlot(req: Request, res: Response) {
        const { placeId, start, end } = req.body;
        if (!placeId || !start || !end) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.checkout_slot_missing_data,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        if (isNaN(placeId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("placeId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const newSlot = await CheckoutSlotService.createCheckoutSlot(Number(placeId), startDate, endDate);
            res.status(HttpStatus.OK).json(newSlot);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}
