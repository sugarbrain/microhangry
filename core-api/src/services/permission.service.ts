import db from "../config/database";
import { Permission, SafePermission } from "../entities/permission.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/messages";

/**
 * @namespace Services
 * @class PermissionService
 */
export class PermissionService {
    /**
     * Create permission
     * 
     * @param name
     */
    public static async create(name: string): Promise<SafePermission | Error> {
        const repository = db.getRepository(Permission);
        const newPermission = new Permission(name);

        await this.validateFields(newPermission);

        try {
            await repository.save(newPermission)
            return newPermission.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newPermission: Permission): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newPermission);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

        if (await this.permissionExists(newPermission.getName())) {
            throw new ServerError(Messages.validation.permisson_exists, ErrorCode.ALREADY_EXISTS);
        }

    }

    public static async findById(id: number): Promise<SafePermission> {
        const repository = db.getRepository(Permission);

        try {
            const permission = await repository.findOne(id);
            return permission ? permission.toSafe() : null;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findByIdWithoutSafety(id: number): Promise<Permission> {
        const repository = db.getRepository(Permission);

        try {
            const permission = await repository.findOne(id);
            return permission;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<SafePermission[]> {
        const repository = db.getRepository(Permission);

        try {
            const permissions = await repository.find();
            return permissions.map((permission) => permission.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async permissionExists(name: string): Promise<boolean> {
        const repository = db.getRepository(Permission);

        try {
            const count = await repository
                .createQueryBuilder("permission")
                .where("name = :name", { name })
                .getCount();
            return count > 0;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

}