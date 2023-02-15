import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

export enum DeviceStatus {
  CHECKEDOUT = "checkedout",
  RESERVED = "reserved",
  LOST = "lost",
  STOLEN = "stolen",
  BROKEN = "broken",
}

@ObjectType()
@Entity("Item")
export class Item extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn()
  serial_number: string;

  @Field()
  @Column("varchar", { default: "" })
  brand: string;

  @Field()
  @Column("varchar", { default: "" })
  model: string;

  @Column("varchar", { default: "" })
  code_name: string;

  @Field()
  @Column({
    type: "enum",
    enum: DeviceStatus,
  })
  status: DeviceStatus;

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
