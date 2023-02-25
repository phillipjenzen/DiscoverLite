import { Request, Response } from "express";
import { Item } from "../entity/item";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

const view_inventory = async (_req: Request, res: Response) => {
  try {
    const item_details = await Item.findBy({});

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

const view_item = async (req: Request, res: Response) => {
  try {
    const serial_number = req.params.id;

    const item_details = await Item.findOneByOrFail({ serial_number });

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof EntityNotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

const add_item = async (req: Request, res: Response) => {
  try {
    const { serial_number, brand, model, code_name } = req.body;

    const new_device = Item.create({
      serial_number,
      brand,
      model,
      code_name,
    });

    await Item.insert(new_device);

    res.status(201).json(new_device);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof QueryFailedError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

const modify_item = async (req: Request, res: Response) => {
  try {
    const serial_number = req.body.serial_number;

    const existing_item = await Item.findOneByOrFail({ serial_number });

    const { brand, model, code_name, status } = req.body;

    Object.assign(existing_item, {
      brand,
      model,
      code_name,
      status,
    });

    await Item.update({ serial_number }, existing_item);

    res.status(201).json(existing_item);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof QueryFailedError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

const delete_item = async (req: Request, res: Response) => {
  try {
    const serial_number = req.body.serial_number;

    const existing_item = await Item.findOneByOrFail({ serial_number });

    await Item.remove(existing_item);

    res.status(204).send();
  } catch (err) {
    console.log(err.stack);
    if (err instanceof EntityNotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

export = { view_inventory, view_item, add_item, modify_item, delete_item };
