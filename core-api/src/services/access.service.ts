import db from "../config/database";
import { Access, SafeAccess } from "../entities/access.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/messages";
import { PlaceService } from "./place.service";
import { PermissionService } from "./permission.service";
import { UserService } from "./user.service";

/**
 * @namespace Services
 * @class AccessService
 */
export class AccessService {
    /**
     * Creates a new Access in the database
     * @param userId
     * @param placeId
     * @param permissionId
     */
    public static async create(userId: number, placeId: number, permissionId: number): Promise<SafeAccess> {
        const repository = db.getRepository(Access);
        const user = await UserService.findByIdWithoutSafety(userId);
        const place = await PlaceService.findByIdWithoutSafety(placeId);
        const permission = await PermissionService.findByIdWithoutSafety(permissionId);

        const newAccess = new Access(user, place, permission);

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

    public static async findById(id: number): Promise<SafeAccess> {
        const repository = db.getRepository(Access);

        try {
            const access = await repository.findOne(id);
            return access ? access.toSafe() : null;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByIdWithoutSafety(id: number): Promise<Access> {
        const repository = db.getRepository(Access);

        try {
            const access = await repository.findOne(id);
            return access;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<SafeAccess[]> {
        const repository = db.getRepository(Access);

        try {
            const accesses = await repository.find();
            return accesses.map((access) => access.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByUserId(userId: number): Promise<SafeAccess[]> {
        const repository = db.getRepository(Access);

        try {
            const accesses = await repository.find({ user: { id: userId } });
            return accesses.map((access) => access.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByPlaceId(placeId: number): Promise<SafeAccess[]> {
        const repository = db.getRepository(Access);

        try {
            const accesses = await repository.find({ place: { id: placeId } });
            return accesses.map((access) => access.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }
}
