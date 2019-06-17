import db from "../config/database";
import { Access, SafeAccess } from "../entities/access.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/messages";
import { PlaceService } from "./place.service";
import { PermissionService } from "./permission.service";

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
    public static async create(place_id: number, permission_id: number): Promise<SafeAccess> {
        const repository = db.getRepository(Access);
        const place = await PlaceService.findById(place_id);
        const permission = await PermissonService.findById(permission_id);

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

        if (await this.permissionExists(newAccess.getPermissionId())) {
            throw new ServerError(Messages.validation.access_exists, ErrorCode.ALREADY_EXISTS);
        }
    }

    public static async permissionExists(permission_id: number): Promise<boolean> {
        const repository = db.getRepository(PlaceCategory);

        try {
            const count = await repository
                .createQueryBuilder("access")
                .where("permission_id = :permission_id", { permission_id })
                .getCount();
            return count > 0;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }
}
