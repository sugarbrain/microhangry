import { Request, Response } from "express";
import { AccessService } from "../services/access.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";

export class AccessController {
    public static async createAccess(req: Request, res: Response) {
        const { userId, placeId, permissionId } = req.body;
        if (!userId || !placeId || !permissionId) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        } else if (isNaN(userId) || isNaN(placeId) || isNaN(permissionId)) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.ids_should_be_numbers,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newAccess = await AccessService.create(userId, placeId, permissionId);
            res.status(HttpStatus.OK).json(newAccess);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async getAccess(req: Request, res: Response) {
        const access = await AccessService.findById(req.params.id);
        res.json(access);
    }

    public static async getAllAccesses(req: Request, res: Response) {
        const accesses = await AccessService.findAll();
        res.json(accesses);
    }
}
