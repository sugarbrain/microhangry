import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";


function PermissionRouter(): Router {
    const router = Router();

    router.post("/create", PermissionController.createPermission);
    router.get("/", PermissionController.getAllPermissions);

    return router;
}

export default PermissionRouter();
