import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

/**
 * @namespace Controllers
 * @class OrderController
 */
export class OrderController {
    public static async createOrder(req: Request, res: Response) {
        const { userId, placeId, checkoutSlotId, items, statusId } = req.body;
        const order = await OrderService.create(userId, placeId, checkoutSlotId, items, statusId);
        return res.json(order);
    }

    public static async updateOrderStatus(req: Request, res: Response) {
        const orderId = req.params.orderId;
        const { statusId } = req.body;
        const order = await OrderService.updateStatus(orderId, statusId);
        return res.json(order);
    }

    public static async getAllOrders(req: Request, res: Response) {
        const orders = await OrderService.findAll();
        return res.json(orders);
    }

    public static async getOrderById(req: Request, res: Response) {
        const orderId = req.params.orderId;
        const order = await OrderService.findById(orderId);
        return res.json(order);
    }

    public static async getOrderByUserId(req: Request, res: Response) {
        const userId = req.params.userId;
        const order = await OrderService.findByUser(userId);
        return res.json(order);
    }

    public static async getOrderByPlaceId(req: Request, res: Response) {
        const placeId = req.params.placeId;
        const orders = await OrderService.findByPlace(placeId);
        return res.json(orders);
    }

    public static async getOrderByStatusId(req: Request, res: Response) {
        const statusId = req.params.statusId;
        const orders = await OrderService.findByStatus(statusId);
        return res.json(orders);
    }

    public static async getOrderItems(req: Request, res: Response) {
        const orderId = req.params.orderId;
        const orders = await OrderService.findOrderItems(orderId);
        return res.json(orders);
    }
}
