import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Length } from "class-validator";
import Messages from "../utils/messages";
import { Place } from "./place.entity";

/**
 * @namespace Entities
 * @class Meal
 */
@Entity()
export class Meal {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 64 })
    @Length(3, 64, {
        message: Messages.validation.meal_name_length,
    })
    public name: string;

    @Column({ length: 255 })
    @Length(3, 255, {
        message: Messages.validation.meal_description_length,
    })
    public description: string;

    @Column()
    public price: number;

    @ManyToOne(type => Place, place => place.meals)
    public place: Place;

    @Column()
    public softDeleted: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    constructor(
        name: string,
        description: string,
        price: number,
        place: Place,
        softDeleted = false) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.place = place;
        this.softDeleted = softDeleted;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): string {
        this.name = name;
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): string {
        this.description = description;
        return this.description;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): number {
        this.price = price;
        return this.price;
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

    public toSafe(): SafeMeal {
        return new SafeMeal(this);
    }

}

/**
 * @namespace Entities
 * @class SafeMeal
 */
export class SafeMeal {
    public id: number;
    public name: string;
    public description: string;
    public price: number;
    public place: Place;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(meal: Meal) {
        this.id = meal.getId();
        this.name = meal.getName();
        this.description = meal.getDescription();
        this.price = meal.getPrice();
        this.place = meal.getPlace();
        this.createdAt = meal.getCreatedAt();
        this.updatedAt = meal.getUpdatedAt();
    }
}

