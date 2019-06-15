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
import { PlaceCategory } from "./placeCategory.entity";


/**
 * @namespace Entities
 * @class Place
 */
@Entity()
export class Place {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ length: 64 })
    @Length(3, 64, {
        message: Messages.validation.place_name_length,
    })
    private name: string;

    @ManyToOne(type => PlaceCategory, placeCategory => placeCategory.places)
    category: PlaceCategory;

    @Column({ length: 64 })
    @Length(3, 64, {
        message: Messages.validation.place_address_length,
    })
    private address: string;

    @Column({ length: 12 })
    @Length(12, 12, {
        message: Messages.validation.place_phone_length,
    })
    private phone: string;

    @Column({ length: 255 })
    @Length(3, 255, {
        message: Messages.validation.place_description_length,
    })
    private description: string;

    @Column()
    private softDeleted: boolean;

    @CreateDateColumn()
    private createdAt: Date;

    @UpdateDateColumn()
    private updatedAt: Date;

    constructor(
        name: string,
        category: PlaceCategory,
        address: string,
        phone: string,
        description: string,
        softDeleted = false,
    ) {
        this.name = name;
        this.category = category;
        this.address = address;
        this.phone = phone;
        this.description = description;
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

    public getCategory(): PlaceCategory {
        return this.category;
    }

    public setCategory(category: PlaceCategory): PlaceCategory {
        this.category = category;
        return this.category;
    }

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): string {
        this.address = address;
        return this.address;
    }

    public getPhone(): string {
        return this.phone;
    }

    public setPhone(phone: string): string {
        this.phone = phone;
        return this.phone;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): string {
        this.description = description;
        return this.description;
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

    public toSafe(): SafePlace {
        return new SafePlace(this);
    }
}

/**
 * @namespace Entities
 * @class SafePlace
 */
export class SafePlace {
    public id: number;
    public name: string;
    public category: PlaceCategory;
    public address: string;
    public phone: string;
    public description: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(place: Place) {
        this.id = place.getId();
        this.name = place.getName();
        this.category = place.getCategory();
        this.address = place.getAddress();
        this.phone = place.getPhone();
        this.description = place.getDescription();
        this.createdAt = place.getCreatedAt();
        this.updatedAt = place.getUpdatedAt();
    }
}
