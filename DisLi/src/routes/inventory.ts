import express from "express";
const router = express.Router();
import { Item } from "../entity/item";
import { DeviceStatus } from "../entity/item";
import bodyParser from "body-parser";
var jsonParser = bodyParser.json();


// ADMIN
// view inventory
router.get("/", async (_req, res) => {
  try {
    const item_details = await Item.findBy({});

    res.status(200).send(item_details);
  } catch (err) {
    res.status(404).send(err);
  }
});

// ADMIN
// view specific inventory
router.get("/:id", async (req, res) => {
  try {
    const serial_number = req.params.id;

    const item_details = await Item.findOneBy({ serial_number });

    if (item_details === null) throw "ERROR:  serial_number not found in Item database";

    res.status(200).send(item_details);
  } catch (err) {
    res.status(404).send(err);
  }
});

// ADMIN
// add inventory
router.post("/", jsonParser, async (req, res) => {
  try {
    const serial_number = req.body.serial_number;

    const existing_item = await Item.findOneBy({ serial_number });

    if (existing_item !== null) throw "ERROR:  duplicate serial_number violates unique constraint in Item table";

    const brand = req.body.brand;
    const model = req.body.model;
    const code_name = req.body.code_name;

    const new_device = Item.create({
      serial_number,
      brand,
      model,
      code_name,
    });

    DeviceStatus.CHECKEDOUT;

    await Item.save(new_device);

    res.status(201).send(new_device);
  } catch (err) {
    res.status(400).send(err);
  }
});

// ADMIN
// modify inventory
router.put("/", jsonParser, async (req, res) => {
  try {
    const serial_number = req.body.serial_number;

    const existing_item = await Item.findOneBy({ serial_number });

    if (existing_item === null) throw "ERROR:  serial_number not found in Item database";

    existing_item.brand = req.body.brand;
    existing_item.model = req.body.model;
    existing_item.code_name = req.body.code_name;

    const status = req.body.status;
    if (!Object.values(DeviceStatus).includes(status)) throw "ERROR:  invalid status type"
    existing_item.status = status;

    Item.save(existing_item);

    res.status(201).send(existing_item);
  } catch (err) {
    res.status(400).send(err);
  }
});

// ADMIN
// delete inventory
router.delete("/", jsonParser, async (req, res) => {
  try {
    const serial_number = req.body.serial_number;

    const existing_item = await Item.findOneBy({ serial_number });

    if (existing_item === null) throw "ERROR:  serial_number not found in Item database";

    await Item.delete({ serial_number });

    res.status(204).send();
  } catch (err) {
    res.status(400).send(err);
  }
});

export = router;