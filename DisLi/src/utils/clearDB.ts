import { Application } from "../entity/application";
import { Checkout } from "../entity/checkout";
import { Help } from "../entity/help";
import { Item } from "../entity/item";
import { Person } from "../entity/person";
import { Program } from "../entity/program";
import { Waitlist } from "../entity/waitlist";

export async function clearDB() {
  Application.delete({});
  Checkout.delete({});
  Help.delete({});
  Item.delete({});
  Person.delete({});
  Program.delete({});
  Waitlist.delete({});
}
