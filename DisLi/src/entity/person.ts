import { Field, ObjectType } from "type-graphql";
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

export enum UserRole {
  ADMIN = "admin",
  FACULTY = "faculty",
  FRESHMEN = "freshmen",
  SOPHMORE = "sophmore",
  JUNIOR = "junior",
  SENIOR = "senior",
}

@ObjectType()
@Entity("Person")
export class Person extends BaseEntity {
  @PrimaryColumn()
  university_id: string;

  @Field()
  @Column("varchar", { default: "" })
  email: string;

  @Field()
  @Column("varchar", { default: "" })
  first_name: string;

  @Field()
  @Column("varchar", { default: "" })
  last_name: string;

  @Field()
  @Column("varchar", { default: "" })
  phone_number: string;

  @Field()
  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @Field()
  @Column("boolean", { default: false })
  verified: boolean;

  @Field()
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
