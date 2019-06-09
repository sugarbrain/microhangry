import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import messages from "../utils/messages";

export class UserController {
    public static async getUser(req: Request, res: Response) {
        const user = await UserService.findById(req.params.id);
        if (!user) {
            res.status(HttpStatus.NOT_FOUND).json(new ServerError(
                messages.user_not_found,
                ErrorCode.RECORD_NOT_FOUND
            ).toJSON());

            return;
        }
        res.json(user);
    }

    public static async getAllUsers(req: Request, res: Response) {
        const users = await UserService.findAll();
        res.json(users);
    }
}
