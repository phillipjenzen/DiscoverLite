import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";

import { Person } from "./person";

@Entity("Checkout")
export class Checkout extends BaseEntity {
  @PrimaryColumn()
  serial_number: string; // one to one relationship with iventory item

  @ManyToOne(() => Person, (university_id) => university_id.checkout)
  university_id: Person;

  @Column({ type: "timestamp", nullable: true })
  return_date: Date;

  @Column({ type: "timestamp", nullable: true })
  checkout_date: Date;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public last_updated: Date;
}
