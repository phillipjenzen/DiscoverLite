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

@Entity("Help")
export class Help extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Person, (university_id) => university_id.checkout)
  university_id: Person;

  @Column("varchar", { default: "" })
  first_name: string;

  @Column("varchar", { default: "" })
  last_name: string;

  @Column("varchar", { default: "" })
  room: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @Column("varchar", { default: "" })
  Problem: string;

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
