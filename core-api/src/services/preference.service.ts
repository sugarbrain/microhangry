import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

/**
 * @namespace Services
 * @class PreferenceService
 */
export class PreferenceService {

    /**
     * Creates a new preference in the database
     * @param userId
     * @param placeCategoryId
     * @param checkoutSlotId
     */
    public static async create(userId: string, placeCategoryId: string, checkoutSlotId: string): Promise<any> {
        try {
            const preference = await axios.post('http://preference:8081/preferences/create', {
                userId,
                placeCategoryId,
                checkoutSlotId
            }, { adapter });
            return preference.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
    * Find preferences by id
    * @param id
    */
    public static async findById(id: string): Promise<any> {
        try {
            const preference = await axios.get(`http://preference:8081/preferences/${id}`, { adapter });
            return preference.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
    * Find preferences by userId
    * @param userId
    */
    public static async findByUserId(userId: string): Promise<any> {
        try {
            const preference = await axios.get(`http://preference:8081/preferences/users/${userId}`, { adapter });
            return preference.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
    * Find preferences by placeCategoryId
    * @param placeCategoryId
    */
    public static async findByPlaceCategoryId(placeCategoryId: string): Promise<any> {
        try {
            const preference = await axios.get(`http://preference:8081/preferences/place-categories/${placeCategoryId}`, { adapter });
            return preference.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
     * Find all preferences in the database
     */
    public static async findAllPreferences(): Promise<any> {
        try {
            const preferences = await axios.get('http://preference:8081/preferences/', { adapter });
            return preferences.data;
        } catch (e) {
            console.info(e.message);
        }
    }
}