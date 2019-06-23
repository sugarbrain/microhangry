import db from "../config/database";
import { Preference } from "../entities/preference.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";

/**
 * @namespace Services
 * @class PreferenceService
 */
export class PreferenceService {
    /**
     * Create preference in database
     * 
     * @param userId
     * @param placeCategoryId
     * @param checkoutSlotId
     */
    public static async create(userId: number, placeCategoryId: number, checkoutSlotId: number): Promise<Preference | Error> {
        const repository = db.getRepository(Preference);
        const newPreference = new Preference(userId, placeCategoryId, checkoutSlotId);

        await this.validateFields(newPreference);

        try {
            await repository.save(newPreference)
            return newPreference;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newPreference: Preference): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newPreference);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

    }

    public static async findById(id: number): Promise<Preference> {
        const repository = db.getRepository(Preference);

        try {
            const preference = await repository.findOne(id);
            return preference;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByUserId(userId: number): Promise<Preference[]> {
        const repository = db.getRepository(Preference);

        try {
            const preferences = await repository.find({ userId: userId });
            return preferences;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByPlaceCategoryId(placeCategoryId: number): Promise<Preference[]> {
        const repository = db.getRepository(Preference);

        try {
            const preferences = await repository.find({ placeCategoryId: placeCategoryId });
            return preferences;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<Preference[]> {
        const repository = db.getRepository(Preference);

        try {
            const preferences = await repository.find();
            return preferences;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

}