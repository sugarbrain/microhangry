import db from "../config/database";
import { Place, SafePlace } from "../entities/place.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import { PlaceCategoryService } from "./placeCategory.service";
import Messages from "../utils/messages";

/**
 * @namespace Services
 * @class PlaceService
 */
export class PlaceService {
    /**
     * Creates a new place in the database
     * @param name
     * @param category_id
     * @param address
     * @param phone
     * @param description
     */
    public static async create(name: string, category_id: number, address: string, phone: string, description: string): Promise<SafePlace> {
        const repository = db.getRepository(Place);

        const placeCategory = await PlaceCategoryService.findById(category_id);

        const newPlace = new Place(name, placeCategory, address, phone, description);

        await this.validateFields(newPlace);

        try {
            await repository.save(newPlace);
            return newPlace.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newPlace: Place): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newPlace);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

        if (!newPlace.category) {
            throw new ServerError(Messages.validation.place_category_does_not_exist, ErrorCode.RECORD_NOT_FOUND);
        }
    }

    public static async findById(id: number): Promise<SafePlace> {
        const repository = db.getRepository(Place);

        try {
            const place: Place = await repository.findOne(id);
            return place ? place.toSafe() : null;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<SafePlace[]> {
        const repository = db.getRepository(Place);

        try {
            const places: Place[] = await repository.find();
            return places.map((place) => place.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }
}
