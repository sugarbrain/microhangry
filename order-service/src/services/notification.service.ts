import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

/**
 * @namespace Services
 * @class NotificationService
 */
export class NotificationService {
    public static baseUrl = () => {
        let url = `http://${process.env.NOTIFICATION_HOST}`;
        const port = process.env.NODE_ENV === 'development' ? 8081 : null;

        if (port) {
            url += `:${port}`;
        }

        return url;
    }

    /**
     * Creates a new notification
     * @param message
     * @param userId
     */
    public static async create(message: string, userId: number): Promise<{}> {
        try {
            const notification = await axios.post(`${this.baseUrl()}/notifications/create`, {
                userId,
                message,
            }, { adapter });
            console.info(notification.data);
            return notification.data;
        } catch (e) {
            console.info(e.message);
        }
    }
}
