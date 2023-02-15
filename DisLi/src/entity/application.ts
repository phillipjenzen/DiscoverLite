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

export enum ApplicationStatus {
  APPROVED = "approved",
  DENIED = "denied",
  PENDING = "pending",
  REMOVED = "removed",
}

@ObjectType()
@Entity("Application")
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("varchar", { default: "" })
  brand: string;

  @Field()
  @Column("varchar", { default: "" })
  model: string;

  @Field()
  @Column({
    type: "enum",
    enum: ApplicationStatus,
  })
  status: ApplicationStatus;

  @Field(() => Person)
  @ManyToOne(() => Person, (university_id) => university_id.checkout)
  university_id: Person;

  @Field()
  @Column("varchar", { default: "" })
  reviewed_by: string;

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
