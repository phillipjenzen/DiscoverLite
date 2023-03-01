import { Express } from "express";
import Application from "./routes/application";
import Help from "./routes/help";
import Inventory from "./routes/inventory";
import Program from "./routes/program";

const routes =  (app: Express) => {
  app.use("/application", Application);
  app.use("/help", Help);
  app.use("/inventory", Inventory);
  app.use("/program", Program);
}

export default routes;
