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
 * @class Permission
 */
@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 64 })
    @Length(3, 20, {
        message: Messages.validation.permisson_length,
    })
    public name: string;

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

    public toSafe(): SafePermission {
        return new SafePermission(this);
    }

}

/**
 * @namespace Entities
 * @class SafePermission
 */
export class SafePermission {
    public id: number;
    public name: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(permisson: Permission) {
        this.id = permisson.getId();
        this.name = permisson.getName();
        this.createdAt = permisson.getCreatedAt();
        this.updatedAt = permisson.getUpdatedAt();
    }
}

