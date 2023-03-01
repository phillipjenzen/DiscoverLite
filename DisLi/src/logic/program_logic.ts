import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { Program } from "../entity/program";

const view_programs = async (_req: Request, res: Response) => {
  try {
    const item_details = await Program.findBy({});

    res.status(200).json(item_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

const add_program = async (req: Request, res: Response) => {
  try {
    const { code_name, availiable_to } = req.body;

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
};

const delete_program = async (req: Request, res: Response) => {
  try {
    const { code_name, availiable_to } = req.body;
    const program_details = await Program.findBy({ code_name, availiable_to });

    await Program.remove(program_details);

    res.status(200).json(program_details);
  } catch (err) {
    console.log(err.stack);
    res.status(404).send("ERROR");
  }
};

export = {
  view_programs,
  add_program,
  delete_program,
};
