import { Router } from "express";
import { PreferenceController } from "../controllers/preference.controller";


function PreferenceRouter(): Router {
    const router = Router();

    router.post("/create", PreferenceController.createPreference);
    router.get("/", PreferenceController.getAllPreferences);
    router.get("/:id", PreferenceController.getPreferenceById);
    router.get("/users/:userId", PreferenceController.getPreferenceByUserId);
    router.get("/place-categories/:placeCategoryId", PreferenceController.getPreferenceByPlaceCategoryId);
    return router;
}

export default PreferenceRouter();
