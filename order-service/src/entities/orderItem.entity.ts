import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Order } from "./order.entity";

/**
* @namespace Entities
* @class OrderItem
*/
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(type => Order)
  public order: Order;

  @Column()
  public mealId: number;

  @Column()
  public quantity: number;

  constructor(mealId: number, quantity: number) {
    this.mealId = mealId;
    this.quantity = quantity;
  }

  public getId(): number {
    return this.id;
  }

  public getOrder(): Order {
    return this.order;
  }

  public setOrder(order: Order): Order {
    this.order = order;
    return this.order;
  }

  public getMealId(): number {
    return this.mealId;
  }

  public setMealId(mealId: number): number {
    this.mealId = mealId;
    return this.mealId;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): number {
    this.quantity = quantity;
    return this.quantity;
  }
}
