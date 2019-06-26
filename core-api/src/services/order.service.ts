import axios from 'axios';
import adapter from 'axios/lib/adapters/http';

/**
 * @namespace Services
 * @class OrderService
 */
export class OrderService {
    public static baseUrl = () => {
        let url = `http://${process.env.ORDER_HOST}`;
        const port = process.env.NODE_ENV === 'development' ? 8081 : null;

        if (port) {
            url += `:${port}`;
        }

        return url;
    }

    public static async create(
        userId: number,
        placeId: number,
        checkoutSlotId: number,
        items: any,
        statusId: number): Promise<any> {
        try {
            const order = await axios.post(`${this.baseUrl()}/orders/create`, {
                userId,
                placeId,
                checkoutSlotId,
                items,
                statusId
            }, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async findById(id: number): Promise<any> {
        try {
            const order = await axios.get(`${this.baseUrl()}/orders/${id}`, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async findAll(): Promise<any> {
        console.log(this.baseUrl());
        try {
            const order = await axios.get(`${this.baseUrl()}/orders`, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async findByUser(userId: number): Promise<any> {
        try {
            const order = await axios.get(`${this.baseUrl()}/orders/user/${userId}`, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async findByPlace(placeId: number): Promise<any> {
        try {
            const order = await axios.get(`${this.baseUrl()}/orders/place/${placeId}`, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async findByStatus(statusId: number): Promise<any> {
        try {
            const order = await axios.get(`${this.baseUrl()}/orders/status/${statusId}`, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async findOrderItems(orderId: number): Promise<any> {
        try {
            const order = await axios.get(`${this.baseUrl()}/orders/${orderId}/items`, { adapter });
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }

    public static async updateStatus(orderId: number, statusId: number): Promise<any> {
        try {
            const order = await axios.put(
                `${this.baseUrl()}/orders/${orderId}`,
                { statusId },
                { adapter }
            );
            return order.data;
        } catch (e) {
            console.info(e.message);
            return e.response.data;
        }
    }
}
