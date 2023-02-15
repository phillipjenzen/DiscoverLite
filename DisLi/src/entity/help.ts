import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Person } from "./person";

export enum UserRole {
  ADMIN = "admin",
  FACULTY = "faculty",
  FRESHMEN = "freshmen",
  SOPHMORE = "sophmore",
  JUNIOR = "junior",
  SENIOR = "senior",
}

@ObjectType()
@Entity("Help")
export class Help extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Person)
  @ManyToOne(() => Person, (university_id) => university_id.checkout)
  university_id: Person;

  @Field()
  @Column("varchar", { default: "" })
  first_name: string;

  @Field()
  @Column("varchar", { default: "" })
  last_name: string;

  @Field()
  @Column("varchar", { default: "" })
  room: string;

  @Field()
  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @Field()
  @Column("varchar", { default: "" })
  Problem: string;

  @Field()
  @Column("boolean", { default: false })
  resolved: boolean;

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
