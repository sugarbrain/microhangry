import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Length } from "class-validator";
import Messages from "../utils/messages";
import { Place } from "./place.entity";

/**
 * @namespace Entities
 * @class PlaceCategoty
 */
@Entity()
export class PlaceCategory {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 64 })
    @Length(3, 64, {
        message: Messages.validation.place_category_length,
    })
    public name: string;

    @OneToMany(type => Place, place => place.category)
    public places: Place[];

    @Column()
    public softDeleted: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    constructor(name: string, softDeleted = false) {
        this.name = name;
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

    public getPlaces(): Place[] {
        return this.places;
    }

    public setPlaces(places: Place[]): Place[] {
        this.places = places;
        return this.places;
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

    public toSafe(): SafePlaceCategory {
        return new SafePlaceCategory(this);
    }

}

/**
 * @namespace Entities
 * @class SafePlaceCategory
 */
export class SafePlaceCategory {
    public id: number;
    public name: string;
    public places: Place[];
    public createdAt: Date;
    public updatedAt: Date;

    constructor(placeCategory: PlaceCategory) {
        this.id = placeCategory.getId();
        this.name = placeCategory.getName();
        this.places = placeCategory.getPlaces();
        this.createdAt = placeCategory.getCreatedAt();
        this.updatedAt = placeCategory.getUpdatedAt();
    }
}
