import { Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";
import { MealService } from "../services/meal.service";

export class MealController {
    public static async createMeal(req: Request, res: Response) {
        const { name, description, price, place_id } = req.body;
        if (!name || !description || !price || !place_id) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newMeal = await MealService.create(name, description, price, place_id);
            res.status(HttpStatus.OK).json(newMeal);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async getAllMeals(req: Request, res: Response) {
        const meals = await MealService.findAll();
        res.json(meals);
    }
}
