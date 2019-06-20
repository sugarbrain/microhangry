import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { IsIn } from "class-validator";
import Messages from "../utils/Messages";
import OrderStatus from "../utils/OrderStatus";

/**
 * @namespace Entities
 * @class Order
 */
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column()
    public placeId: number;

    @Column()
    public checkoutSlotId: number;

    @Column()
    @IsIn(Object.keys(OrderStatus).map((key) => { return Number(key) }), {
        message: Messages.validation.order_status_dont_exist,
    })
    public statusId: number;

    constructor(userId: number, placeId: number, checkoutSlotId: number, statusId: number) {
        this.userId = userId;
        this.placeId = placeId;
        this.checkoutSlotId = checkoutSlotId;
        this.statusId = statusId;
    }

    public getId(): number {
        return this.id;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): number {
        this.userId = userId;
        return this.userId;
    }

    public getPlaceId(): number {
        return this.placeId;
    }

    public setPlaceId(placeId: number): number {
        this.placeId = placeId;
        return this.placeId;
    }

    public getCheckoutSlotId(): number {
        return this.checkoutSlotId;
    }

    public setCheckoutSlotId(checkoutSlotId: number): number {
        this.checkoutSlotId = checkoutSlotId;
        return this.checkoutSlotId;
    }

    public getStatusId(): number {
        return this.statusId;
    }

    public setStatusId(status: number): number {
        this.statusId = status;
        return this.statusId;
    }

}