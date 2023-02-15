import "reflect-metadata";
import { DataSource } from "typeorm";
// import { profile } from "../entity/profile";
// import { friend } from "../entity/friend";
// import { message } from "../entity/message";
import { Application } from "../entity/application";
import { Checkout } from "../entity/checkout";
import { Help } from "../entity/help";
import { Item } from "../entity/item";
import { Person } from "../entity/person";
import { Program } from "../entity/program";
import { Waitlist } from "../entity/waitlist";

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: "db",
  host: "localhost",
  port: 5432,
  // username: "postgres",
  username: "test",
  password: "test",
  // database: "postgres",
  database: "testdb",
  synchronize: true,
  logging: false,
  entities: [Application, Checkout, Help, Item, Person, Program, Waitlist],
  migrations: [],
  subscribers: [],
});
