import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

/**
 * @namespace Services
 * @class NotificationService
 */
export class NotificationService {

    /**
     * Creates a new notification
     * @param message
     * @param userId
     */
    public static async create(message: string, userId: number): Promise<{}> {
        try {
            const notification = await axios.post('http://notification:8081/notifications/create', {
                userId,
                message,
            }, { adapter });
            return notification.data;
        } catch (e) {
            console.info(e.message);
        }
    }
}