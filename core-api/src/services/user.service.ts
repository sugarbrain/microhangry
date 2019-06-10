import db from "../config/database";
import { User, SafeUser } from "../entities/user.entity";
import { ServerError, ErrorCode } from "../utils/serverError";
import { ValidationError, validate } from "class-validator";
import Messages from "../utils/messages";

/**
 * @namespace Services
 * @class UserService
 */
export class UserService {
    /**
     * Creates a new user in the database
     * @param name
     * @param email
     * @param password
     */
    public static async create(name: string, email: string, password: string): Promise<SafeUser> {
        const repository = db.getRepository(User);
        const newUser = new User(name, email, password);

        await this.validateFields(newUser);

        try {
            await repository.save(newUser);
            return newUser.toSafe();
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_CONSTRAINT);
        }
    }

    private static async validateFields(newUser: User): Promise<void> {
        const validationErrors: ValidationError[] = await validate(newUser);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((err) => Object.values(err.constraints));

            throw new ServerError(errorMessages.join(". "), ErrorCode.FIELD_VALIDATION);
        }

        if (await this.nameExists(newUser.getName())) {
            throw new ServerError(Messages.validation.username_exists, ErrorCode.ALREADY_EXISTS);
        }

        if (await this.emailExists(newUser.getEmail())) {
            throw new ServerError(Messages.validation.email_exists, ErrorCode.ALREADY_EXISTS);
        }

    }

    public static async findById(id: number): Promise<SafeUser> {
        const repository = db.getRepository(User);

        try {
            const user: User = await repository.findOne(id);
            return user ? user.toSafe() : null;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async findAll(): Promise<SafeUser[]> {
        const repository = db.getRepository(User);

        try {
            const users: User[] = await repository.find();
            return users.map((user) => user.toSafe());
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async nameExists(name: string): Promise<boolean> {
        const repository = db.getRepository(User);

        try {
            const count = await repository
                .createQueryBuilder("user")
                .where("name = :name", { name })
                .getCount();

            return count > 0;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }

    public static async emailExists(email: string): Promise<boolean> {
        const repository = db.getRepository(User);

        try {
            const count = await repository
                .createQueryBuilder("user.email")
                .where("email = :email", { email })
                .getCount();

            return count > 0;
        } catch (e) {
            throw new ServerError(e.message, ErrorCode.DATABASE_ERROR);
        }
    }
}
