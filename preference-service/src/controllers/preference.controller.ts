import { Request, Response } from "express";
import { PreferenceService } from "../services/preference.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/Messages";

export class PreferenceController {
    public static async createPreference(req: Request, res: Response) {
        const { userId, placeCategoryId, checkoutSlotId } = req.body;
        if (!userId || !placeCategoryId || !checkoutSlotId) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.preference_data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        [userId, placeCategoryId, checkoutSlotId].forEach(param => {
            if (isNaN(param)) {
                res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                    Messages.validation.id_must_be_number(param),
                    ErrorCode.NOT_ENOUGH_DATA,
                ).toJSON());
            }
        });

        try {
            const newPreference = await PreferenceService.create(Number(userId), Number(placeCategoryId), Number(checkoutSlotId));
            res.status(HttpStatus.OK).json(newPreference);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }


    public static async getPreferenceById(req: Request, res: Response) {
        const id = req.params.id;

        if (isNaN(id)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("id"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const preference = await PreferenceService.findById(id);
        res.json(preference);
    }

    public static async getPreferenceByUserId(req: Request, res: Response) {
        const userId = req.params.userId;

        if (isNaN(userId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("userId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const preferences = await PreferenceService.findByUserId(userId);
        res.json(preferences);
    }

    public static async getPreferenceByPlaceCategoryId(req: Request, res: Response) {
        const placeCategoryId = req.params.placeCategoryId;

        if (isNaN(placeCategoryId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.id_must_be_number("placeCategoryId"),
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());
        }

        const preferences = await PreferenceService.findByPlaceCategoryId(placeCategoryId);
        res.json(preferences);
    }

    public static async getAllPreferences(req: Request, res: Response) {
        const preferences = await PreferenceService.findAll();
        res.json(preferences);
    }
}
