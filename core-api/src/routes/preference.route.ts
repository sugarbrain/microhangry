import { Router } from "express";
import { PreferenceController } from "../controllers/preference.controller";

function PreferenceRouter(): Router {
    const router = Router();

    router.post("/create", PreferenceController.createPreference);
    router.get("/", PreferenceController.getAllPreferences);
    router.get("/:id", PreferenceController.getPreferencesById);
    router.get("/users/:userId", PreferenceController.getPreferencesByUserId);
    router.get("/place-categories/:placeCategoryId", PreferenceController.getPreferencesByPlaceCategoryId);
    return router;
}

export default PreferenceRouter();