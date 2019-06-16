import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import Messages from "../utils/messages";
import { Access } from "./access.entity";


/**
 * @namespace Entities
 * @class User
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    private id: number;

    @Column({ length: 64 })
    @Length(3, 20, {
        message: Messages.validation.username_length,
    })
    private name: string;

    @Column({
        length: 30,
        unique: true,
    })
    @IsEmail({}, {
        message: Messages.validation.email_not_valid,
    })
    private email: string;

    @Column({
        select: false,
    })
    private password: string;

    @OneToMany(type => Access, access => access.user)
    accesses: Access[];

    @Column()
    private softDeleted: boolean;

    @CreateDateColumn()
    private createdAt: Date;

    @UpdateDateColumn()
    private updatedAt: Date;

    constructor(
        name: string,
        email: string,
        password: string,
        softDeleted = false,
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
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

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): string {
        this.email = email;
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): string {
        this.password = password;
        return this.password;
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

    public toSafe(): SafeUser {
        return new SafeUser(this);
    }
}

/**
 * @namespace Entities
 * @class SafeUser
 */
export class SafeUser {
    public id: number;
    public name: string;
    public email: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(user: User) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
        this.updatedAt = user.getUpdatedAt();
    }
}
