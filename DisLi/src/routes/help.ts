import express from "express";
const router = express.Router();
import { Help } from "../entity/help";
import bodyParser from "body-parser";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
var jsonParser = bodyParser.json();

// ADMIN
// view help request queue
router.get("/", async (_req, res) => {
  try {
    const item_details = await Help.findBy({});

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
});

// ADMIN/(TEACHER IF AUTHORIZED)
// view specific help request details
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const item_details = await Help.findOneByOrFail({ id });

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof EntityNotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
});

// TODO
// ADMIN/TEACHER
// view your help requests
router.get("/user", async (req, res) => {
  req.params;
  res.status(200).send("get-help-mine");
});

// ADMIN/TEACHER
// add help requests
router.post("/", jsonParser, async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const room = req.body.room;
    const problem = req.body.problem;
    const resolved = req.body.resolved;

    // TODO: REMEMBER TO ADD UNIVERSITY_ID with PERSON enitity

    const new_device = Help.create({
      first_name,
      last_name,
      room,
      problem,
      resolved,
    });

    await Help.insert(new_device);

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

// ADMIN/TEACHER
// delete inventory
router.delete("/", jsonParser, async (req, res) => {
  try {
    const id = req.body.id;

    const existing_item = await Help.findOneByOrFail({ id });

    await Help.remove(existing_item);

    res.status(204).send();
  } catch (err) {
    console.log(err.stack);
    if (err instanceof EntityNotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
});

// ADMIN/TEACHER
// change resolved for specific application
router.put("/", jsonParser, async (req, res) => {
  try {
    const id = req.body.id;

    const existing_item = await Help.findOneByOrFail({ id });

    existing_item.first_name = req.body.first_name;
    existing_item.last_name = req.body.last_name;
    existing_item.room = req.body.room;
    existing_item.problem = req.body.problem;
    existing_item.resolved = req.body.resolved;

    await Help.update({ id }, existing_item);

    res.status(201).json(existing_item);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof EntityNotFoundError) {
      res.status(404).send(err.message);
    } else if (err instanceof QueryFailedError) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
});

export = router;
