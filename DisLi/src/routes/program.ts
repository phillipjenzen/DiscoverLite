import express from "express";
const router = express.Router();
import { Program } from "../entity/program";
import bodyParser from "body-parser";
import { QueryFailedError } from "typeorm";
var jsonParser = bodyParser.json();

// ADMIN
// view programs
router.get("/", async (_req, res) => {
  try {
    const item_details = await Program.findBy({});

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
});

// ADMIN
// add programs
router.post("/", jsonParser, async (req, res) => {
  try {
    const code_name = req.body.code_name;
    const availiable_to = req.body.availiable_to;

    const new_device = Program.create({
      code_name,
      availiable_to,
    });

    await Program.insert(new_device);

    res.status(201).json(new_device);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof QueryFailedError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
});

// ADMIN
// modify/depricate inventory
router.put("/", async (req, res) => {
  req.params;
  res.status(200).send("put-inventory");
});

export = router;
