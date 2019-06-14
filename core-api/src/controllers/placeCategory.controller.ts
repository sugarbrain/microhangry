import { Request, Response } from "express";
import { PlaceCategoryService } from "../services/placeCategory.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";

export class PlaceCategoryController {
    public static async createPlaceCategory(req: Request, res: Response) {
        const { name } = req.body;
        if (!name) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newPlaceCategory = await PlaceCategoryService.create(name);
            res.status(HttpStatus.OK).json(newPlaceCategory);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async getAllPlaceCategories(req: Request, res: Response) {
        const placeCategories = await PlaceCategoryService.findAll();
        res.json(placeCategories);
    }
}

