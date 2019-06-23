import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

/**
 * @namespace Entities
 * @class Preference
 */
@Entity()
export class Preference {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column()
    public placeCategoryId: number;

    @Column()
    public checkoutSlotId: number;


    constructor(userId: number, placeCategoryId: number, checkoutSlotId: number) {
        this.userId = userId;
        this.placeCategoryId = placeCategoryId;
        this.checkoutSlotId = checkoutSlotId;
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

    public getPlaceCategoryId(): number {
        return this.placeCategoryId;
    }

    public setPlaceCategoryId(placeCategoryId: number): number {
        this.placeCategoryId = placeCategoryId;
        return this.placeCategoryId;
    }

    public getCheckoutSlotId(): number {
        return this.checkoutSlotId;
    }

    public setCheckoutSlotId(checkoutSlotId: number): number {
        this.checkoutSlotId = checkoutSlotId;
        return this.checkoutSlotId;
    }

}