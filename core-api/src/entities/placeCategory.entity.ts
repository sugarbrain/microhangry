import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Length } from "class-validator";
import Messages from "../utils/messages";

/**
 * @namespace Entities
 * @class PlaceCategoty
 */
@Entity()
export class PlaceCategory {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ length: 64 })
    @Length(3, 64, {
        message: Messages.validation.place_category_length,
    })
    private name: string;

    @Column()
    private softDeleted: boolean;

    @CreateDateColumn()
    private createdAt: Date;

    @UpdateDateColumn()
    private updatedAt: Date;

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
    public createdAt: Date;
    public updatedAt: Date;

    constructor(placeCategory: PlaceCategory) {
        this.id = placeCategory.getId();
        this.name = placeCategory.getName();
        this.createdAt = placeCategory.getCreatedAt();
        this.updatedAt = placeCategory.getUpdatedAt();
    }
}
