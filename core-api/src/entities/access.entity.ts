import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Place } from "./place.entity";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";


/**
* @namespace Entities
* @class Access
*/
@Entity()
export class Access {
  @PrimaryGeneratedColumn()
  private id: number;

  @ManyToOne(type => User, user => user.accesses, { eager: true })
  user: User;

  @ManyToOne(type => Place, place => place.accesses, { eager: true })
  place: Place;

  @OneToOne(type => Permission, { eager: true })
  @JoinColumn()
  private permission: Permission;

  @Column()
  private softDeleted: boolean;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  constructor(place: Place, permission: Permission, softDeleted = false) {
    this.place = place;
    this.permission = permission;
    this.softDeleted = softDeleted;
  }

  public getId(): number {
    return this.id;
  }

  public getPlace(): Place {
    return this.place;
  }

  public setPlace(place: Place): Place {
    this.place = place;
    return this.place;
  }

  public getUser(): User {
    return this.user;
  }

  public setUser(user: User): User {
    this.user = user;
    return this.user;
  }

  public getPermission(): Permission {
    return this.permission;
  }

  public setPermission(permission: Permission): Permission {
    this.permission = permission;
    return this.permission;
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

  public toSafe(): SafeAccess {
    return new SafeAccess(this);
  }

}

/**
* @namespace Entities
* @class SafePermission
*/
export class SafeAccess {
  public id: number;
  public placeId: number;
  public permission: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(access: Access) {
    this.id = access.getId();
    this.placeId = access.getPlace().getId();
    this.permission = access.getPermission().getName();
    this.createdAt = access.getCreatedAt();
    this.updatedAt = access.getUpdatedAt();
  }
}
