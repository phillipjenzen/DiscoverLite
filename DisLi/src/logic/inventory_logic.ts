import { Request, Response } from "express";
import { Item } from "../entity/item";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { replaceAll } from "../utils/replaceAll";

const view_inventory = async (_req: Request, res: Response) => {
  try {
    const item_details = await Item.findBy({ deprecated: false });

    let show_items: any = [
      {
        elementType: "divider",
      },
    ];

    item_details.forEach((ele) => {
      const anID = replaceAll(ele.serial_number, "-", "");
      console.log(anID);

      show_items.push({
        id: anID,
        elementType: "blockHeading",
        heading: ele.serial_number,
        headingLevel: 2,
        description: `<span style='color:red;font-size:1.0025rem'>${ele.status}</span><span style='font-size:1.0025rem'> - ${ele.brand} ${ele.model}</span><br></br>${ele.code_name}`,
        buttons: [
          {
            elementType: "linkButton",
            title: "information",
            icon: "notification_information",
            iconPosition: "iconOnly",
            actionStyle: "normal",
            link: {
              relativePath: " ",
            },
          },
          {
            elementType: "formButton",
            title: "delete",
            icon: "delete",
            buttonType: "submit",
            actionStyle: "destructive",
            iconPosition: "iconOnly",
            confirmationMessage: "Are you sure you want to delete this?",
            events: [
              {
                eventName: "click",
                action: "ajaxUpdate",
                useRelativePathToUpdate: true,
                targetId: anID,
                ajaxRelativePath: "/",
                requestMethod: "put",
                postData: {
                  serial_number: ele.serial_number,
                  deprecated: true,
                },
              },
              {
                eventName: "click",
                action: "hide",
                targetId: anID,
              },
              {
                eventName: "click",
                action: "hide",
                targetId: `${anID}DIV`,
              },
            ],
          },
        ],
      });

      show_items.push({
        id: `${anID}DIV`,
        elementType: "divider",
      });
    });

    const data = {
      metadata: {
        version: "2.0",
      },
      contentContainerWidth: "narrow",
      content: [
        {
          elementType: "blockHeading",
          heading: "Inventory",
          headingLevel: 1,
          headingFontWeight: "light",
          description:
            "<strong>Filter:</strong> <br></br>code name: 'placeholder text :)'",
          descriptionLineHeight: "loose",
          descriptionFontStyle: "italic",
          descriptionTextColor: "#566573",
        },
        {
          elementType: "container",
          id: "custom_styling",
          content: show_items,
        },
      ],
    };

    res.status(200).json(data);
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
      res.status(400).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

const modify_item = async (req: Request, res: Response) => {
  try {
    console.log("SUP FROM inventory_logic - modify_item");
    const serial_number = req.body.serial_number;

    const existing_item = await Item.findOneByOrFail({ serial_number });

    const { brand, model, code_name, status, deprecated } = req.body;

    Object.assign(existing_item, {
      brand,
      model,
      code_name,
      status,
      deprecated,
    });

    await Item.update({ serial_number }, existing_item);

    if (deprecated) {
      const thing = {
        metadata: {
          version: "2.0",
        },
        elementFields: {
          id: "",
          heading: "",
          headingLevel: 2,
          description: "",
          buttons: [],
        },
      };

      res.status(201).json(thing);
    } else {
      res.status(201).json(existing_item);
    }
  } catch (err) {
    console.log(err.stack);
    if (err instanceof QueryFailedError) {
      res.status(404).send(err.message);
    } else {
      res.status(400).send("ERROR");
    }
  }
};

export = { view_inventory, view_item, add_item, modify_item };
