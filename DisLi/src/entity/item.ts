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
  CHECKEDIN = "checkedin",
}

@Entity("Item")
export class Item extends BaseEntity {
  @PrimaryColumn()
  serial_number: string;

  @Column("varchar", { default: "" })
  brand: string;

  @Column("varchar", { default: "" })
  model: string;

  @Column("varchar", { default: "" })
  code_name: string;

  @Column({
    type: "enum",
    enum: DeviceStatus,
    // nullable: true,
    default: DeviceStatus.CHECKEDIN,
  })
  status: DeviceStatus;

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
