import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Place } from "./place.entity";

/**
* @namespace Entities
* @class CheckoutSlot
*/
@Entity()
export class CheckoutSlot {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column()
    private start: Date;

    @Column()
    private end: Date;

    @ManyToOne(type => Place)
    place: Place;

    @Column()
    private softDeleted: boolean;

    @CreateDateColumn()
    private createdAt: Date;

    @UpdateDateColumn()
    private updatedAt: Date;

    constructor(start: Date, end: Date, place: Place, softDeleted = false) {
        this.start = start;
        this.end = end;
        this.place = place;
        this.softDeleted = softDeleted;
    }

    public getId(): number {
        return this.id;
    }

    public getStart(): Date {
        return this.start;
    }

    public setStart(start: Date): Date {
        this.start = start;
        return this.start;
    }

    public getEnd(): Date {
        return this.end;
    }

    public setEnd(end: Date): Date {
        this.end = end;
        return this.end;
    }

    public getPlace(): Place {
        return this.place;
    }

    public setPlace(place: Place): Place {
        this.place = place;
        return this.place;
    }

    public isSoftDeleted(): boolean {
        return this.softDeleted;
    }

    public setSoftDeleted(softDeleted: boolean): boolean {
        this.softDeleted = softDeleted;
        return this.softDeleted;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public toSafe(): SafeCheckoutSlot {
        return new SafeCheckoutSlot(this);
    }
}

/**
* @namespace Entities
* @class SafeCheckoutSlot
*/
export class SafeCheckoutSlot {
    public id: number;
    public start: Date;
    public end: Date;
    public placeId: number;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(checkoutSlot: CheckoutSlot) {
        this.id = checkoutSlot.getId();
        this.start = checkoutSlot.getStart();
        this.end = checkoutSlot.getEnd();

        if (checkoutSlot.getPlace()) {
            this.placeId = checkoutSlot.getPlace().getId();
        }

        this.createdAt = checkoutSlot.getCreatedAt();
        this.updatedAt = checkoutSlot.getUpdatedAt();
    }
}
