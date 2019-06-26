import db from "../config/database";
import { Meal, SafeMeal } from "../entities/meal.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import { PlaceService } from "./place.service";
import Messages from "../utils/messages";

/**
 * @namespace Services
 * @class MealService
 */
export class MealService {
    /**
     * Creates a new meal in the database
     * @param name
     * @param description
     * @param price
     * @param placeId
     */
    public static async create(name: string, description: string, price: number, placeId: number): Promise<SafeMeal> {
        const repository = db.getRepository(Meal);

        const place = await PlaceService.findByIdWithoutSafety(placeId);

        const newMeal = new Meal(name, description, price, place);

        await this.validateFields(newMeal);

        try {
            await repository.save(newMeal);
            return newMeal.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newMeal: Meal): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newMeal);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

        if (!newMeal.getPlace()) {
            throw new ServerError(Messages.validation.place_does_not_exist, ErrorCode.RECORD_NOT_FOUND);
        }
    }

    public static async findById(id: number): Promise<SafeMeal> {
        const repository = db.getRepository(Meal);

        try {
            const meal: Meal = await repository.findOne(id);
            return meal ? meal.toSafe() : null;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByIdWithoutSafety(id: number): Promise<Meal> {
        const repository = db.getRepository(Meal);

        try {
            const meal: Meal = await repository.findOne(id);
            return meal;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<SafeMeal[]> {
        const repository = db.getRepository(Meal);

        try {
            const meals: Meal[] = await repository.find();
            return meals.map((meal) => meal.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

}
