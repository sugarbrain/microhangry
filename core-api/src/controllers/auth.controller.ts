import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";

export class AuthController {
    public static async signUp(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newUser = await AuthService.signUp(name, email, password);
            res.status(HttpStatus.OK).json(newUser);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async logIn(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const token = await AuthService.login(email, password);
            res.status(HttpStatus.OK).json(token);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}
