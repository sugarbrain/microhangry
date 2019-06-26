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
    public static async create(message: string, userId: string): Promise<any> {
        try {
            const notification = await axios.post(`${this.baseUrl()}/notifications/create`, {
                message,
                userId,
            }, { adapter });
            return notification.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
     * Find all notifications
     */
    public static async findAllNotifications(): Promise<any> {
        try {
            const notifications = await axios.get(`${this.baseUrl()}/notifications/`, { adapter });
            return notifications.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
    * Find notification by id
    * @param id
    */
    public static async findById(id: string): Promise<any> {
        try {
            const notification = await axios.get(`${this.baseUrl()}/notifications/${id}`, { adapter });
            return notification.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
    * Find notifications by userId
    * @param userId
    */
    public static async findByUserId(userId: string): Promise<any> {
        try {
            const notifications = await axios.get(`${this.baseUrl()}/notifications/users/${userId}`, { adapter });
            return notifications.data;
        } catch (e) {
            console.info(e.message);
        }
    }

    /**
    * Find notifications not seen before by userId
    * @param userId
    */
    public static async findByUserIdNotPulled(userId: string): Promise<any> {
        try {
            const notifications = await axios.get(`${this.baseUrl()}/notifications/unseen/users/${userId}`, { adapter });
            return notifications.data;
        } catch (e) {
            console.info(e.message);
        }
    }
}
