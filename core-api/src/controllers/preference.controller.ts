import { Request, Response } from 'express';
import { PreferenceService } from '../services/preference.service';

/**
 * @namespace Controllers
 * @class PreferenceController
 */
export class PreferenceController {
    public static async getAllPreferences(req: Request, res: Response) {
        const preferences = await PreferenceService.findAllPreferences();
        return res.json(preferences);
    }

    public static async getPreferencesById(req: Request, res: Response) {
        const id = req.params.id;
        const preferences = await PreferenceService.findById(id);
        return res.json(preferences);
    }

    public static async getPreferencesByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const preferences = await PreferenceService.findByUserId(userId);
        return res.json(preferences);
    }

    public static async getPreferencesByPlaceCategoryId(req: Request, res: Response) {
        const placeCategoryId = req.params.placeCategoryId;
        const preferences = await PreferenceService.findByPlaceCategoryId(placeCategoryId);
        return res.json(preferences);
    }

    public static async createPreference(req: Request, res: Response) {
        const { userId, placeCategoryId, checkoutSlotId } = req.body;
        const preference = await PreferenceService.create(userId, placeCategoryId, checkoutSlotId);
        return res.json(preference);
    }
}