import { UserService } from "./user.service";
import { SafeUser } from "../entities/user.entity";

/**
 * @namespace Services
 * @class AuthService
 */
export class AuthService {
    /**
     * Signs up a user
     * 
     * @param name
     * @param email
     * @param password
     */
    public static async signUp(
        name: string,
        email: string,
        password: string,
    ): Promise<SafeUser | Error> {
        return await UserService.create(name, email, password);
    }

    /**
     * User login
     *
     * @param email
     * @param password
     */
    public static async login(email: string, password: string): Promise<void> {
        // TODO: login
        return;
    }

    /**
     * User logout
     */
    public static async logout(): Promise<void> {
        // TODO: logout
        return;
    }
}
