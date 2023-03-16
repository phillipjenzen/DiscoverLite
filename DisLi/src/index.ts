import { AppDataSource } from "./utils/data-source";
import "reflect-metadata";
import express from "express";
import routes from "./routes";
import { clearDB } from "./utils/clearDB";

const port = 4000;

const app = express();

app.use(express.json());

routes(app);

app.get("/", (_, res) => {
  res.send("SUP");
});

app.get("/test", (req, res) => {
  // console.log(req.rawHeaders);
  const tmp = req.rawHeaders.findIndex((ele) => ele === "Authorization");
  let jsToken: string;
  if (tmp) jsToken = req.rawHeaders[tmp + 1].split(" ")[1];

  const thing = {
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
        elementType: "toolbar",
        id: "label_menu",
        left: [
          {
            elementType: "toolbarMenu",
            showDisclosureIcon: true,
            items: [
              {
                title: "Menu Category A",
              },
              {
                title: "Menu Category B",
              },
              {
                title: "Menu Category C",
              },
              {
                title: "Menu Category D",
              },
            ],
          },
        ],
        middle: [
          {
            elementType: "toolbarLabel",
            label: "Toolbar Label",
          },
        ],
      },
    ],
  };
  res.status(200).send(thing);
});

app.get("/dev/wipe-database", async (_, res) => {
  clearDB();
  res.send("deleted");
});

AppDataSource.initialize();

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
