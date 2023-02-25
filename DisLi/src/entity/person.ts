import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";

import { Checkout } from "./checkout";
import { Waitlist } from "./waitlist";
import { Application } from "./application";
import { Help } from "./help";

import { UserRole } from "../utils/UserRoles";

@Entity("Person")
export class Person extends BaseEntity {
  @PrimaryColumn()
  university_id: string;

  @Column("varchar", { default: "" })
  email: string;

  @Column("varchar", { default: "" })
  first_name: string;

  @Column("varchar", { default: "" })
  last_name: string;

  @Column("varchar", { default: "" })
  phone_number: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @OneToMany(() => Checkout, (checkout) => checkout.university_id)
  checkout: Checkout;

  @OneToMany(() => Waitlist, (waitlist) => waitlist.university_id)
  waitlist: Waitlist;

  @OneToMany(() => Application, (application) => application.university_id)
  application: Application;

  @OneToMany(() => Help, (help) => help.university_id)
  help: Help;

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
