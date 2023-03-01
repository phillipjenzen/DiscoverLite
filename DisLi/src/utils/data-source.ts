import "reflect-metadata";
import { DataSource } from "typeorm";
import { Application } from "../entity/application";
import { Checkout } from "../entity/checkout";
import { Help } from "../entity/help";
import { Item } from "../entity/item";
import { Person } from "../entity/person";
import { Program } from "../entity/program";
import { Waitlist } from "../entity/waitlist";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "test",
  password: "test",
  database: "testdb",
  synchronize: true,
  logging: false,
  entities: [Application, Checkout, Help, Item, Person, Program, Waitlist],
  migrations: [],
  subscribers: [],
});
