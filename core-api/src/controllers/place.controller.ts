import { Request, Response } from "express";
import { PlaceService } from "../services/place.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";

export class PlaceController {

    public static async createPlace(req: Request, res: Response) {
        const { name, category_id, address, phone, description } = req.body;
        if (!name || !category_id || !address || !phone || !description) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.place_data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newPlace = await PlaceService.create(name, category_id, address, phone, description);
            res.status(HttpStatus.OK).json(newPlace);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async getAllPlaces(req: Request, res: Response) {
        const places = await PlaceService.findAll();
        res.json(places);
    }

    public static async getPlace(req: Request, res: Response) {
        const place = await PlaceService.findById(req.params.id);
        if (!place) {
            res.status(HttpStatus.NOT_FOUND).json(new ServerError(
                Messages.place_not_found,
                ErrorCode.RECORD_NOT_FOUND
            ).toJSON());

            return;
        }
        res.json(place);
    }

    public static async getPlaceMeals(req: Request, res: Response) {
        const place_id = req.params.id;

        if (!place_id) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const meals = await PlaceService.findMeals(place_id);
            res.json(meals);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}