import { Request, Response } from "express";
import { AccessService } from "../services/access.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";

export class AccessController {
    public static async createAccess(req: Request, res: Response) {
        const { place_id, permission_id } = req.body;
        if (!place_id || ! permission_id) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        } else if (isNaN(place_id) || isNaN(permission_id)){
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.ids_should_be_numbers,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newAccess = await AccessService.create(place_id, permission_id);
            res.status(HttpStatus.OK).json(newAccess);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }
}
