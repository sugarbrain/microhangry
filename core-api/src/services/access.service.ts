import db from "../config/database";
import { Access, SafeAccess } from "../entities/access.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/messages";

/**
 * @namespace Services
 * @class AccessService
 */
export class AccessService {
    /**
     * Creates a new Access in the database
     * @param place
     * @param permission
     */
    public static async create(place: Place, permission: Permission): Promise<SafeAccess> {
        const repository = db.getRepository(Access);

        const newAccess = new Access(place, permission);

        await this.validateFields(newAccess);

        try {
            await repository.save(newAccess);
            return newAccess.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newAccess: Access): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newAccess);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }
    }
}