import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Length } from "class-validator";
import Messages from "../utils/Messages";

/**
 * @namespace Entities
 * @class Notification
 */
@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 255 })
    @Length(3, 255, {
        message: Messages.validation.notification_message_length,
    })
    public message: string;

    @Column()
    public userId: number;

    @Column()
    public pulled: boolean;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    constructor(message: string, userId: number) {
        this.message = message;
        this.userId = userId;
        this.pulled = false;
    }

    public getId(): number {
        return this.id;
    }

    public getMessage(): string {
        return this.message;
    }

    public setMessage(message): string {
        this.message = message;
        return this.message;
    }

    public getUserId(): number {
        return this.userId;
    }

    public setUserId(userId: number): number {
        this.userId = userId;
        return this.userId;
    }

    public getPulled(): boolean {
        return this.pulled;
    }

    public setPulled(pulled: boolean): boolean {
        this.pulled = pulled;
        return this.pulled;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }
}