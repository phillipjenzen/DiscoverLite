import { Request, Response } from "express";
import { Help } from "../entity/help";
import { Person } from "../entity/person";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

const view_help_queue = async (_req: Request, res: Response) => {
  try {
    const item_details = await Help.findBy({});

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

const view_help_request = async (req: Request, res: Response) => {
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
};

const view_help_request_authored = async (req: Request, res: Response) => {
  try {
    const { university_id } = req.body;

    const person_details = await Person.findOneByOrFail({ university_id });

    const help_requests_authored = person_details.help;

    res.status(200).json(help_requests_authored);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

const request_help = async (req: Request, res: Response) => {
  try {
    const { room, problem } = req.body;

    // TODO: REMEMBER TO ADD UNIVERSITY_ID with PERSON enitity

    const new_device = Help.create({
      room,
      problem,
      resolved: false,
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
};

const close_help_request = async (req: Request, res: Response) => {
  try {
    const { id, resolved } = req.body;

    const existing_help_request = await Help.findOneByOrFail({ id });

    existing_help_request.resolved = resolved;

    await Help.update({ id }, existing_help_request);

    res.status(201).json(existing_help_request);
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
};

export = {
  view_help_queue,
  view_help_request,
  view_help_request_authored,
  request_help,
  close_help_request,
};
