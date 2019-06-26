import { Router } from "express";
import { PreferenceController } from "../controllers/preference.controller";

function PreferenceRouter(): Router {
    const router = Router();

    /**
     * @swagger
     * tags:
     *   name: Preferences
     * definitions:
     *   Preference:
     *     type: object
     *     properties:
     *       id:
     *         type: number
     *       userId:
     *         type: number
     *       placeCategoryId:
     *         type: number
     *       checkoutSlotId:
     *         type: number
     *   CreatePreference:
     *     type: object
     *     properties:
     *       userId:
     *         type: number
     *       placeCategoryId:
     *         type: number
     *       checkoutSlotId:
     *         type: number
     *   Preferences:
     *      type: array
     *      items:
     *          $ref: '#/definitions/Preference'
     * /preferences:
     *   get:
     *     description: Get all preferences in database
     *     tags: [Preferences]
     *     produces:
     *       - application/json
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Preferences'
     * /preferences/{id}:
     *   get:
     *     description: Get a preference in database by id
     *     tags: [Preferences]
     *     produces:
     *       - application/json
    *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *          type: number
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Preference'
     * /preferences/users/{userId}:
     *   get:
     *     description: Get a preferences list in database by userId
     *     tags: [Preferences]
     *     produces:
     *       - application/json
    *     parameters:
     *       - in: path
     *         name: userId
     *         schema:
     *          type: number
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Preferences'
     * /preferences/place-categories/{placeCategoryId}:
     *   get:
     *     description: Get a preferences list in database by placeCategoryId
     *     tags: [Preferences]
     *     produces:
     *       - application/json
    *     parameters:
     *       - in: path
     *         name: placeCategoryId
     *         schema:
     *          type: number
     *         required: true
     *     responses:
     *       200:
     *         schema:
     *           $ref: '#/definitions/Preferences'
     * /preferences/create:
     *   post:
     *     description: Create a new preference in database
     *     tags: [Preferences]
     *     produces:
     *       - application/json
     *     parameters:
     *       - in: body
     *         name: preference
     *         schema:
     *          $ref: '#/definitions/CreatePreference'
     *     responses:
     *       201:
     *         schema:
     *           $ref: '#/definitions/Preference'
     */
    router.get("/", PreferenceController.getAllPreferences);
    router.get("/:id", PreferenceController.getPreferencesById);
    router.get("/users/:userId", PreferenceController.getPreferencesByUserId);
    router.get("/place-categories/:placeCategoryId", PreferenceController.getPreferencesByPlaceCategoryId);
    router.post("/create", PreferenceController.createPreference);
    return router;
}

export default PreferenceRouter();