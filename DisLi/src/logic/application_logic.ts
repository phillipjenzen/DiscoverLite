import { Request, Response } from "express";
import { Application } from "../entity/application";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { Person } from "../entity/person";
import { Item } from "../entity/item";

const view_all_applications = async (_req: Request, res: Response) => {
  try {
    const item_details = await Application.findBy({});

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

const view_application = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item_details = await Application.findOneByOrFail({ id });

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

const add_application = async (req: Request, res: Response) => {
  try {
    const { brand, model, university_id } = req.body;

    const aPerson = await Person.findOneByOrFail(university_id);

    await Item.findOneByOrFail({ brand, model });

    const new_application = Application.create({
      brand,
      model,
      university_id: aPerson,
    });

    await Application.insert(new_application);

    res.status(201).json(new_application);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof QueryFailedError) {
      res.status(404).send(err.message);
    } else if (err instanceof EntityNotFoundError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

const deicide_on_application = async (req: Request, res: Response) => {
  try {
    const { decision, brand, model, university_id } = req.body;

    const program_details = await Application.update(
      { brand, model, university_id },
      { status: decision }
    );

    res.status(200).json(program_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

export = {
  view_all_applications,
  view_application,
  add_application,
  deicide_on_application,
};
