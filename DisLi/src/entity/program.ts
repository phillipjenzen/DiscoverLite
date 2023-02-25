import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";

import { UserRole } from "../utils/UserRoles";

@Entity("Program")
@Unique("index_name", ["code_name", "availiable_to"])
export class Program extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { default: "" })
  code_name: string;

  @Column({
    type: "enum",
    enum: UserRole,
  })
  availiable_to: UserRole;

  @Column("boolean", { default: false })
  deprecated: boolean;

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
