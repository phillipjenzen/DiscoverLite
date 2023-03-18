import { Request, Response } from "express";
import { Item } from "../entity/item";
import { EntityNotFoundError, QueryFailedError } from "typeorm";
import { replaceAll } from "../utils/replaceAll";

const view_inventory = async (_req: Request, res: Response) => {
  try {
    const item_details = await Item.find({
      where: { deprecated: false },
      order: { created_at: "DESC" },
    });

    let show_items: any = [
      {
        elementType: "divider",
      },
    ];

    item_details.forEach((ele) => {
      const anID = replaceAll(ele.serial_number, "-", "");

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
  const data: any = {
    metadata: {
      version: "2.0",
    },
    contentContainerWidth: "narrow",
    content: [
      {
        elementType: "divider",
        borderColor: "transparent",
      },
      {
        elementType: "form",
        id: "add_item_form",
        heading: {
          heading: "Add Inventory Item",
          headingLevel: 2,
          description: "Items marked with an asterisk (*) are required.",
        },
        items: [
          {
            elementType: "formInputBarcode",
            name: "serial_number",
            label: "Serial Number",
            required: true,
          },
          {
            elementType: "formInputText",
            name: "brand",
            label: "Brand",
          },
          {
            elementType: "formInputText",
            name: "model",
            label: "Model",
          },
          {
            elementType: "formInputText",
            name: "code_name",
            label: "Code Name",
          },
        ],
        buttons: [
          {
            elementType: "formButton",
            name: "s1_reset",
            title: "Reset",
            buttonType: "reset",
            actionStyle: "destructiveQuiet",
            minWidth: "8rem",
          },
          {
            elementType: "formButton",
            name: "s1_submit",
            title: "Submit",
            buttonType: "submit",
            actionStyle: "constructive",
            minWidth: "8rem",
          },
        ],
        trackDirtyStateButtonNames: ["serial_number"],
        buttonsHorizontalAlignment: "center",
      },
    ],
  };

  try {
    const { serial_number, brand, model, code_name } = req.body;

    const new_device = Item.create({
      serial_number,
      brand,
      model,
      code_name,
    });

    await Item.insert(new_device);

    res.status(201).json(data);
  } catch (err) {
    console.log(err.stack);
    if (err instanceof QueryFailedError) {
      data.content[1].items[0].description =
        "<span style='color:red;'>Item already exists in inventory</span>";
      res.status(400).send(data);
    } else {
      data.content[1].items[0].description =
        "<span style='color:red;'>You tried to do something silly!</span>";
      res.status(400).send(data);
    }
  }
};

const modify_item = async (req: Request, res: Response) => {
  try {
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

    if (deprecated === true) {
      const anID = replaceAll(serial_number, "-", "");

      const thing = {
        metadata: {
          version: "2.0",
        },
        elementFields: {
          heading: "<span style='color:red;'>REMOVED</span>",
          headingLevel: 3,
          description: "",
          buttons: [
            {
              elementType: "formButton",
              title: "undo",
              icon: "reload",
              buttonType: "submit",
              actionStyle: "destructive",
              iconPosition: "iconOnly",
              confirmationMessage: "Are you sure you want to undo this?",
              events: [
                {
                  eventName: "click",
                  action: "ajaxUpdate",
                  useRelativePathToUpdate: true,
                  targetId: anID,
                  ajaxRelativePath: "/",
                  requestMethod: "put",
                  postData: {
                    serial_number,
                    deprecated: false,
                  },
                },
              ],
            },
          ],
        },
      };

      res.status(201).json(thing);
    } else if (deprecated === false) {
      const item_details = await Item.findOneBy({ serial_number });

      const anID = replaceAll(serial_number, "-", "");

      const thing = {
        metadata: {
          version: "2.0",
        },
        elementFields: {
          heading: serial_number,
          headingLevel: 2,
          description: `<span style='color:red;font-size:1.0025rem'>${
            item_details!.status
          }</span><span style='font-size:1.0025rem'> - ${item_details!.brand} ${
            item_details!.model
          }</span><br></br>${item_details!.code_name}`,
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
                    serial_number,
                    deprecated: true,
                  },
                },
              ],
            },
          ],
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

const add_item_page = async (req: Request, res: Response) => {
  const thing = Item.createQueryBuilder("Item")
    .select("DISTINCT Item.brand")
    .distinct(true)
    .getRawMany();

  console.log(thing);

  const data = {
    metadata: {
      version: "2.0",
    },
    contentContainerWidth: "narrow",
    content: [
      {
        elementType: "divider",
        borderColor: "transparent",
      },
      {
        elementType: "form",
        id: "add_item_form",
        heading: {
          heading: "Add Inventory Item",
          headingLevel: 2,
          description: "Items marked with an asterisk (*) are required.",
        },
        items: [
          {
            elementType: "formInputBarcode",
            name: "serial_number",
            label: "Serial Number",
            required: true,
          },
          {
            elementType: "formInputText",
            name: "brand",
            label: "Brand",
          },
          {
            elementType: "formInputText",
            name: "model",
            label: "Model",
          },
          {
            elementType: "formInputText",
            name: "code_name",
            label: "Code Name",
          },
        ],
        buttons: [
          {
            elementType: "formButton",
            name: "s1_reset",
            title: "Reset",
            buttonType: "reset",
            actionStyle: "destructiveQuiet",
            minWidth: "8rem",
          },
          {
            elementType: "formButton",
            name: "s1_submit",
            title: "Submit",
            buttonType: "submit",
            actionStyle: "constructive",
            minWidth: "8rem",
          },
        ],
        trackDirtyStateButtonNames: ["serial_number"],
        buttonsHorizontalAlignment: "center",
      },
    ],
  };

  res.status(200).json(data);
};

export = { view_inventory, view_item, add_item, modify_item, add_item_page };
