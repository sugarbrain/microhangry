import { Request, Response } from "express";
import { PermissionService } from "../services/permission.service";
import { HttpStatus } from "../utils/httpStatus";
import { ServerError, ErrorCode } from "../utils/serverError";
import Messages from "../utils/messages";

export class PermissionController {
    public static async createPermission(req: Request, res: Response) {
        const { name } = req.body;
        if (!name) {
            res.status(HttpStatus.BAD_REQUEST).json(new ServerError(
                Messages.validation.data_needs_to_be_provided,
                ErrorCode.NOT_ENOUGH_DATA,
            ).toJSON());

            return;
        }

        try {
            const newPermission = await PermissionService.create(name);
            res.status(HttpStatus.OK).json(newPermission);
        } catch (err) {
            res.status(HttpStatus.BAD_REQUEST).json(err);
        }
    }

    public static async getAllPermissions(req: Request, res: Response) {
        const permissions = await PermissionService.findAll();
        res.json(permissions);
    }
}
