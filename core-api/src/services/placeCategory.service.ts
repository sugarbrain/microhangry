import db from "../config/database";
import { PlaceCategory, SafePlaceCategory } from "../entities/placeCategory.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/messages";

/**
 * @namespace Services
 * @class PlaceCategoryService
 */
export class PlaceCategoryService {
    /**
     * Create place category
     * 
     * @param name
     */
    public static async create(name: string): Promise<SafePlaceCategory | Error> {
        const repository = db.getRepository(PlaceCategory);
        const newPlaceCategory = new PlaceCategory(name);

        await this.validateFields(newPlaceCategory);

        try {
            await repository.save(newPlaceCategory)
            return newPlaceCategory.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newPlaceCategory: PlaceCategory): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newPlaceCategory);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

        if (await this.placeCategoryExists(newPlaceCategory.getName())) {
            throw new ServerError(Messages.validation.place_category_exists, ErrorCode.ALREADY_EXISTS);
        }

    }

    public static async findById(id: number): Promise<SafePlaceCategory> {
        const repository = db.getRepository(PlaceCategory);

        try {
            const placeCategory = await repository.findOne(id);
            return placeCategory ? placeCategory.toSafe() : null;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<SafePlaceCategory[]> {
        const repository = db.getRepository(PlaceCategory);

        try {
            const placeCategories = await repository.find();
            return placeCategories.map((placeCategory) => placeCategory.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async placeCategoryExists(name: string): Promise<boolean> {
        const repository = db.getRepository(PlaceCategory);

        try {
            const count = await repository
                .createQueryBuilder("placeCategory")
                .where("name = :name", { name })
                .getCount();
            return count > 0;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

}
