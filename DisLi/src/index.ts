import { AppDataSource } from "./utils/data-source";
import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Application from "./routes/application";
import Help from "./routes/help";
import Inventory from "./routes/inventory";
import Program from "./routes/program";


const port = 4000;

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("SUP");
  });

  app.use("/application", Application);
  app.use("/help", Help);
  app.use("/inventory", Inventory);
  app.use("/program", Program);


  AppDataSource.initialize();

  app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
  });
})();
